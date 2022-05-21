const { AuthenticationError } = require('apollo-server-express');

const { User, Book } = require('../models');

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('books');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('books');
    },
    // get all books
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    // get a book by id
    book: async (parent, { _id }) => {
      return Book.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
    
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      return user;
    }
  }
};

module.exports = resolvers;