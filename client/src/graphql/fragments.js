import { gql } from 'apollo-boost';

export const USER_INFO = gql`
  fragment userInfo on User {
    _id
    name
    email
    about
    username
    images {
      url
      public_id
    }
    createdAt
    updatedAt
  }
`;
