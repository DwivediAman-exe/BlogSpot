const { gql } = require('apollo-server-express');

module.exports = gql`
  type Post {
    _id: ID!
    title: String!
    content: String!
    image: Image
    postedBy: User
  }

  type Query {
    allPosts: [Post!]!
    postsByUser: [Post!]!
  }

  # input type
  input PostCreateInput {
    title: String!
    content: String!
    image: ImageInput
  }

  # mutations
  type Mutation {
    postCreate(input: PostCreateInput!): Post!
  }
`;
