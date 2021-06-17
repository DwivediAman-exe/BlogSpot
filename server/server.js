require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const db = require('./db');
const cloudinary = require('cloudinary');
const { authCheckMiddleware } = require('./helpers/auth');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

db();

app.get('/rest', authCheckMiddleware, (req, res) => {
  res.json({
    data: 'you hit the endpoint',
  });
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post('/uploadimages', authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(
    req.body.image,
    (result) => {
      res.status(200).send({
        url: result.secure_url,
        public_id: result.public_id,
      });
    },
    {
      public_id: `${Date.now}`,
      resource_type: 'auto',
      folder: 'GQLsocialapp',
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
