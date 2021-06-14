const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');
const { DateTimeResolver } = require('graphql-scalars');
const Post = require('../models/post');
const User = require('../models/user');

// mutations
const postCreate = async (parent, args, { req, res }) => {
  const currentUser = await authCheck(req);

  if (args.input.content.trim() === '' || args.input.title.trim() === '')
    throw new Error('Title & Content is required for creating a Post');

  const currentUserFromDb = await User.findOne({ email: currentUser.email });
  let newPost = await new Post({
    ...args.input,
    postedBy: currentUserFromDb._id,
  })
    .save()
    .then((post) => post.populate('postedBy', '_id username').execPopulate());

  return newPost;
};

// queries
const allPosts = async (parents, args) => {
  return await Post.find({}).exec();
};

const postsByUser = async (parents, args, { req, res }) => {
  const currentUser = await authCheck(req);

  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  return await Post.find({ postedBy: currentUserFromDb })
    .populate('postedBy', '_id username')
    .sort({ createdAt: -1 });
};

module.exports = {
  Query: {
    allPosts,
    postsByUser,
  },
  Mutation: {
    postCreate,
  },
};
