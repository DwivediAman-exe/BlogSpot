const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');
const shortid = require('shortid');
const User = require('../models/user');
const { DateTimeResolver } = require('graphql-scalars');

const profile = async (parent, args, { req, res }) => {
  const currentUser = await authCheck(req);
  return await User.findOne({ email: currentUser.email }).exec();
};

const userCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email });
  return user
    ? user
    : new User({
        email: currentUser.email,
        username: shortid.generate(),
      }).save();
};

const userUpdate = async (parents, args, { req }) => {
  const currentUser = await authCheck(req);

  const updatedUser = await User.findOneAndUpdate(
    { email: currentUser.email },
    { ...args.input },
    { new: true }
  ).exec();

  return updatedUser;
};

module.exports = {
  Query: {
    profile,
  },
  Mutation: {
    userCreate,
    userUpdate,
  },
};
