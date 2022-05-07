const { authCheck } = require('../helpers/auth');
const shortid = require('shortid');
const User = require('../models/user');

const profile = async (parent, args, { req, res }) => {
	const currentUser = await authCheck(req);
	return await User.findOne({ email: currentUser.email }).exec();
};

const publicProfile = async (parent, args, { req, res }) => {
	return await User.findOne({ username: args.username }).exec();
};

const allUsers = async (parent, args, { req, res }) =>
	await User.find({}).exec();

// mutation function to create new user
const userCreate = async (parent, args, { req }) => {
	// middleware check
	const currentUser = await authCheck(req);

	// checking if user exists otherwise creating new user
	const user = await User.findOne({ email: currentUser.email });
	return user
		? user
		: new User({
				email: currentUser.email,
				username: shortid.generate(),
		  }).save();
};

// mutation to update the user
const userUpdate = async (parent, args, { req }) => {
	const currentUser = await authCheck(req);

	const updatedUser = await User.findOneAndUpdate(
		{ email: currentUser.email },
		{ ...args.input },
		{ new: true } // sending the newly updated information
	).exec();

	return updatedUser;
};

module.exports = {
	Query: {
		profile,
		publicProfile,
		allUsers,
	},
	Mutation: {
		userCreate,
		userUpdate,
	},
};
