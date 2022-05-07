const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar DateTime
	type Query {
		me: String!
	}

	type UserCreateResponse {          // new user type
		username: String!
		email: String!             
	}

	type Image {                       // image type
		url: String
		public_id: String
	}

	type User {                        // user type
		_id: ID!
		username: String
		name: String
		email: String
		images: [Image]
		about: String
		createdAt: DateTime
		updatedAt: DateTime
	}

	input ImageInput {            // image input type
		url: String
		public_id: String
	}

	input UserUpdateInput {        // user input for userupdate mutation
		username: String
		name: String
		images: [ImageInput]      
		about: String
		email: String!
	}

	type Query {                                  // queries
		profile: User!  
		publicProfile(username: String!): User!
		allUsers: [User!]
	}

	type Mutation {                               // mutations
		userCreate: UserCreateResponse!
		userUpdate(input: UserUpdateInput): User!
	}
`;
