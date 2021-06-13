const { gql } = require('apollo-server-express');
const { posts } = require('../temp');
const { authCheck } = require('../helpers/auth');
const { DateTimeResolver } = require('graphql-scalars');

// queries
const totalPosts = () => posts.length;
const allPosts = async (parent, args, { req, res }) => {
  await authCheck(req);
  return posts;
};

// mutations
const newPost = (parent, args) => {
  const { title, description } = args.input;
  const post = {
    id: posts.length + 1,
    title,
    description,
  };
  posts.push(post);
  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
