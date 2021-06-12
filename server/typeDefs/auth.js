const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    me: String!
  }
  type UserCreateResponse {
    username: String!
    email: String!
  }
  type Mutation {
    userCreate: UserCreateResponse!
  }
`;
