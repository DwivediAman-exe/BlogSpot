const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');
const { DateTimeResolver } = require('graphql-scalars');
const Post = require('../models/post');
const User = require('../models/user');

// mutations
const postCreate = async (parent, args, { req }) => {
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
const allPosts = async (parent, args) => {
  return await Post.find({})
    .populate('postedBy', 'username _id')
    .sort({ createdAt: -1 })
    .exec();
};

const postsByUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  return await Post.find({ postedBy: currentUserFromDb })
    .populate('postedBy', '_id username')
    .sort({ createdAt: -1 });
};

const singlePost = async (parent, args) => {
  return await Post.findById({ _id: args.postId })
    .populate('postedBy', '_id username')
    .exec();
};

const postUpdate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  if (args.input.content.trim() === '' || args.input.title.trim() === '')
    throw new Error('Title & Content is required for creating a Post');

  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  const postToUpdate = await Post.findById({ _id: args.input._id }).exec();

  if (currentUserFromDb._id.toString() !== postToUpdate.postedBy._id.toString())
    throw new Error('Unauthorized Action');

  let updatedPost = await Post.findByIdAndUpdate(
    args.input._id,
    {
      ...args.input,
    },
    { new: true }
  ).exec();

  return updatedPost;
};

const postDelete = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  const postToDelete = await Post.findById({ _id: args.postId }).exec();

  if (currentUserFromDb._id.toString() !== postToDelete.postedBy._id.toString())
    throw new Error('Unauthorized Action');

  let deletedPost = await Post.findByIdAndDelete({ _id: args.postId }).exec();

  return deletedPost;
};

module.exports = {
  Query: {
    allPosts,
    postsByUser,
    singlePost,
  },
  Mutation: {
    postCreate,
    postUpdate,
    postDelete,
  },
};
