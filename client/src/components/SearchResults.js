import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { SEARCH } from '../graphql/queries';
import PostCard from './PostCard';

const SearchResults = () => {
  const { query } = useParams();

  const { data, loading } = useQuery(SEARCH, { variables: { query } });

  if (loading)
    return <p className="p-5 text-center text-warning">LOADING...</p>;

  if (!data.search.length)
    return (
      <p className="p-5 text-center text-warning">
        No Matching results found...
      </p>
    );

  return (
    <p>
      <div className="container">
        <div className="row p-5">
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
