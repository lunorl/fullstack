const jwt = require('jsonwebtoken')
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require('uuid')
const { GraphQlError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User = require('./models/User')
const Person = require('./models/Person')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
    type User {
      username: String!
      friends: [Person!]!
      id: ID!
    }

    type Token {
      value: String!
    }
    type Address {
    street: String!
    city: String!
    }
    type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
    }
    enum YesNo {
      YES
      NO
    }
    type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
    }

    type Mutation {
      addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
      ): Person
      createUser(
        username: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
      editNumber(
        name: String!
        phone: String!
        ): Person
      addAsFriend(
        name: String!
        ): User
        }
    `;

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }

      return Person.find({ phone: { $exists: args.phone === 'YES'}})
    
    },
    findPerson: (root, args) => Person.findOne({ name: args.name}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQlError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      try {
      await person.save()
      currentUser.friends = currentUser.friends.concat(person)
      await currentUser.save()
      } catch (error) {
        throw new GraphQlError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return person
      },
    editNumber: async (root, args) => {
      const person = Person.findOne({ name: args.name })
      person.phone = args.phone
      try {
      await person.save()
      } catch (error) {
        throw new GraphQlError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return person
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
      .catch(error => {
        throw new GraphQlError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})

      if ( !user || args.password !== 'secret') {
        throw new GraphQlError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
    addAsFriend: async (root, args, { currentUser}) => {
      const isFriend = (person) =>
        currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())

      if (!currentUser) {
        throw new GraphQlError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT'}
        })
      }

      const person = await Person.findOne({ name: args.name })
      if ( !isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
      .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
