import { useQuery } from '@apollo/react-hooks';
import { ALL_USERS } from '../graphql/queries';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';

const Users = () => {
  const { data, loading, error } = useQuery(ALL_USERS);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="row p-5">
        <h1 className="text-center mb-3">
          <i class="fas fa-user-friends text-warning"></i> Members
        </h1>
        {data &&
          data.allUsers.map((user) => (
            <div className="col-md-4 mb-3 key={user._id}  ">
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
