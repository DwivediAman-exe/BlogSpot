const { gql } = require('apollo-server-express');

const me = () => 'aman';

module.exports = {
  Query: {
    me,
  },
};
