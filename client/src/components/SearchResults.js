import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { SEARCH } from '../graphql/queries';
import PostCard from './PostCard';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams();

  const { data, loading } = useQuery(SEARCH, { variables: { query } });

  if (loading) return <Loading />;

  if (!data.search.length)
    return (
      <div className="text-center fw-normal mt-5">
        <p className="p-5 fs-1 text-center text-dark">
          No Matching results found for "{query}"
        </p>
        <Link to="/">
          <button className="btn btn-lg btn-rounded py-2 fs-6 btn-outline-primary mt-1">
            back to Home
          </button>
        </Link>
      </div>
    );

  return (
    <p>
      <div className="container">
        <div className="row p-5">
          <h2 className="text-center ">
            <i class="fab fa-hubspot text-success"></i> Related Posts
          </h2>
          <hr
            style={{
              width: '26%',
              margin: '1% 38%',
              color: 'black',
              height: '5px',
            }}
          />
          {data.search.map((post) => (
            <div className="col-md-6 p-4 " key={post._id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </p>
  );
};

export default SearchResults;
