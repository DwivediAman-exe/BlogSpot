const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const { authCheck } = require('./helpers/auth');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Database Connected');
  } catch (err) {
    console.log('Database Connection Error', err);
  }
};
db();

app.get('/rest', authCheck, (req, res) => {
  res.json({
    data: 'you hit the endpoint',
  });
});

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

apolloServer.applyMiddleware({ app });

const httpserver = http.createServer(app);

app.listen(process.env.PORT, () => {
  console.log(`\nServer is running on http://localhost:${process.env.PORT}`);
  console.log(
    `GraphQL Playground is on http://localhost:${process.env.PORT}/graphql`
  );
});
