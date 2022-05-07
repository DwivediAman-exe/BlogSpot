const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: 'Content is required',
			text: true,
		},
		content: {
			type: String,
			required: 'Content is required',
		},
		image: {
			url: {
				type: String,
				default: 'https://via.placeholder.com/200x200.png?text=POST',
			},
			public_id: {
				type: String,
				default: Date.now,
			},
		},
		postedBy: {
			type: ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
