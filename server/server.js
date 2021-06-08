const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require('http');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.json({
    data: 'you hit the endpoint',
  });
});

const typeDefs = gql`
  type Query {
    totalPosts: Int!
  }
`;

const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app });

const httpserver = http.createServer(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  console.log(
    `GraphQL Playground is on http://localhost:${process.env.PORT}/graphql`
  );
});
