const { gql } = require('apollo-server-express');

module.exports = gql`
  type Post {
    _id: ID!
    title: String!
    content: String!
    image: Image
    postedBy: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allPosts: [Post!]!
    postsByUser: [Post!]!
    singlePost(postId: String!): Post!
  }

  # input type
  input PostCreateInput {
    title: String!
    content: String!
    image: ImageInput
  }

  input PostUpdateInput {
    _id: String!
    title: String!
    content: String!
    image: ImageInput
  }

  # mutations
  type Mutation {
    postCreate(input: PostCreateInput!): Post!
    postUpdate(input: PostUpdateInput!): Post!
    postDelete(postId: String): Post!
  }
`;
