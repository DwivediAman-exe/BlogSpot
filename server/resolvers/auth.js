const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');

const me = async (parent, args, { req, res }) => {
  await authCheck(req);
  return 'aman';
};

module.exports = {
  Query: {
    me,
  },
};
