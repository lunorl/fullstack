const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const Author = require("./schemas/Author");
const Book = require("./schemas/Book");
const { GraphQLError } = require("graphql");
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return await Book.find({}).populate("author");
      }
      return await Book.find({
        genres: { $in: [args.genre] },
      }).populate("author");
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    genres: async (root, args) => {
      let genres = [];
      const books = await Book.find({}).populate("author");
      books.forEach((book) =>
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) {
            genres = genres.concat(genre);
          }
        })
      );
      return genres;
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: root._id }).countDocuments();
    },
  },
  Mutation: {
    createUser: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const user = new User({ ...args });
      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed1", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = { username: user.username, id: user._id };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addBook: async (root, args) => {
      let s = await Author.findOne({ name: args.author });
      if (!s) {
        const author = new Author({ name: args.author, bookCount: 1 });
        try {
          s = await author.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed2", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      } else {
        s.bookCount += 1;
        try {
          await s.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed3", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: s._id,
              error,
            },
          });
        }
      }
      let book = new Book({
        title: args.title,
        published: args.published,
        author: s._id,
        genres: args.genres,
      });
      try {
        book = await book.populate("author");
        await book.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      } catch (error) {
        throw new GraphQLError("Saving book failed2", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: book,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let v = false;
      const guy = await Author.find({ name: args.name });
      if (guy) {
        guy.born = args.setBornTo;
        try {
          return await guy.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed4", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      } else {
        return null;
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};
module.exports = resolvers;
