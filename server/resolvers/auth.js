const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');
const shortid = require('shortid');
const User = require('../models/user');

const me = async (parent, args, { req, res }) => {
  await authCheck(req);
  return 'aman';
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

module.exports = {
  Query: {
    me,
  },
  Mutation: {
    userCreate,
  },
};
