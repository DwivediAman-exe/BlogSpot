import { gql } from 'apollo-boost';
import { USER_INFO, POST_DATA } from './fragments';

// to update user information
export const USER_UPDATE = gql`
	mutation userUpdate($input: UserUpdateInput!) {
		userUpdate(input: $input) {
			...userInfo
		}
	}
	${USER_INFO}
`;

// to create new user
export const USER_CREATE = gql`
	mutation userCreate {
		userCreate {
			username
			email
		}
	}
`;

// to create post
export const POST_CREATE = gql`
	mutation postCreate($input: PostCreateInput!) {
		postCreate(input: $input) {
			...postData
		}
	}
	${POST_DATA}
`;

// to delete post
export const POST_DELETE = gql`
	mutation postDelete($postId: String!) {
		postDelete(postId: $postId) {
			_id
		}
	}
`;

// to update post
export const POST_UPDATE = gql`
	mutation postUpdate($input: PostUpdateInput!) {
		postUpdate(input: $input) {
			...postData
		}
	}
	${POST_DATA}
`;
