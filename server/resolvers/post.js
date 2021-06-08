const { gql } = require('apollo-server-express');

const totalPosts = () => 42;

module.exports = {
  Query: {
    totalPosts,
  },
};
