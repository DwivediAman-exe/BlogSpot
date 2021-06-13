const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const { authCheckMiddleware } = require('./helpers/auth');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

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

app.post('/uploadimages', authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(
    req.body.image,
    (result) => {
      res.status(200).send({
        url: result.url,
        public_id: result.public_id,
      });
    },
    {
      public_id: `${Date.now}`,
      resource_type: 'auto',
    }
  );
});

app.post('/removeimage', authCheckMiddleware, (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.send('ok');
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
