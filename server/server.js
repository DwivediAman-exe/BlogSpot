require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const cloudinary = require('cloudinary');
const { authCheckMiddleware } = require('./helpers/auth');

// npm package to create apollo express server
const { ApolloServer } = require('apollo-server-express');
// npm package for merging resolvers and typedefs
const {
	fileLoader,
	mergeTypes,
	mergeResolvers,
} = require('merge-graphql-schemas');

// making express app
const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// connecting database to the server
db();

// Demo rest endpoint
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

// merging all files in typeDefs directory
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));
// merging all files in resolvers directory
const resolvers = mergeResolvers(
	fileLoader(path.join(__dirname, './resolvers'))
);

// creating graphQL server
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => ({ req, res }), // req and res are passed as context to graphQL server
});

// this connects ApolloServer to a specific Http framework i.r express
apolloServer.applyMiddleware({ app });

// Express function to bind and listen the connections on the specified host and port.
app.listen(process.env.PORT, () => {
	console.log(`\n Server is running on http://localhost:${process.env.PORT}`);

	console.log(
		`GraphQL Playground is on http://localhost:${process.env.PORT}/graphql`
	);
});
