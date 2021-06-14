import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router-dom';
import { GET_ALL_POSTS } from '../graphql/queries';

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const [fetchPost, { data: posts }] = useLazyQuery(GET_ALL_POSTS);

  const { state, dispatch } = useContext(AuthContext);

  const updateUsereName = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: 'ryan',
    });
  };

  let history = useHistory();

  if (loading) return <p className="p-5 text-center">LOADING...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>{post.title}</h4>
                  </div>
                  <p className="card-text">{post.content}</p>
                  <p className="card-text">@{post.postedBy.username}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row p-5">
        <button className="btn btn-info" onClick={() => fetchPost()}>
          Fetch
        </button>
      </div>
      <hr />
      {JSON.stringify(posts)}
      <hr />
      {JSON.stringify(state.user)}
      <hr />
      <button className="btn btn-primary" onClick={updateUsereName}>
        change user name
      </button>
      <hr />
      {JSON.stringify(history)}
    </div>
  );
};

export default Home;
