const typeDefs = `
    type User {
      username: String!
      favoriteGenre: String!
      _id: String!
    }

    type Token {
      value: String!
    }
    type Query {
      bookCount: Int!,
      authorCount: Int!
      allBooks(genre: String): [Book!],
      allAuthors: [Author!]
      me: User
      genres: [String!]!
    }
      type Book {
      title: String!,
      published: Int!,
      author: Author!,
      _id: String!,
      genres: [String!]
      }
      type Author {
      name: String!,
      _id: String!,
      born: Int,
      bookCount: Int!
      } 
      type Mutation {
          addBook(
          title: String!,
          author: String!,
          published: Int!,
          genres: [String!]
          ): Book!
          editAuthor(
          name: String!,
          setBornTo: Int!)  
          : Author  
          createUser(
            username: String!
            favoriteGenre: String!
          ): User
          login(
            username: String!
            password: String!
          ): Token
      }
      type Subscription {
      bookAdded: Book!
      }
  `;
module.exports = typeDefs;
