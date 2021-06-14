const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');
const { DateTimeResolver } = require('graphql-scalars');
const Post = require('../models/post');
const User = require('../models/user');

// queries

// mutations
const postCreate = async (parent, args, { req, res }) => {
  const currentUser = await authCheck(req);

  if (args.input.content.trim() === '' || args.input.title.trim() === '')
    throw new Error('Title and Content is required');

  const currentUserFromDb = await User.findOne({ email: currentUser.email });
  let newPost = await new Post({
    ...args.input,
    postedBy: currentUserFromDb._id,
  })
    .save()
    .then((post) => post.populate('postedBy', '_id username').execPopulate());

  return newPost;
};

module.exports = {
  Query: {},
  Mutation: {
    postCreate,
  },
};
