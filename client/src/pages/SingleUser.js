import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';

const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
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
  }
`;

const SingleUser = () => {
  let params = useParams();

  const { loading, data } = useQuery(PUBLIC_PROFILE, {
    variables: {
      username: params.username,
    },
  });

  if (loading) return <Loading />;

  return (
    <div className="m-5 ps-5 pe-5 pu-2 pb-2">
      <UserCard user={data.publicProfile} />
    </div>
  );
};

export default SingleUser;
