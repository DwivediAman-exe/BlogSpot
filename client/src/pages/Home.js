import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { GET_ALL_POSTS, TOTAL_POSTS } from '../graphql/queries';
import PostCard from '../components/PostCard';
import PostPagination from '../components/PostPagination';
import Loading from '../components/Loading';

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery(GET_ALL_POSTS, {
    variables: { page },
  });

  const { data: postCount } = useQuery(TOTAL_POSTS);

  if (loading) return <Loading />;

  return (
    <div className="homebg">
      <div className="container">
        <h1 className="text-center p-5 pb-1">
          <i class="far fa-newspaper text-warning"></i> Latest Blogs
        </h1>
        <div className="row p-4 pt-3 pb-2">
          {data &&
            data.allPosts.map((post) => (
              <div className="col-md-6 p-5 pb-3" key={post._id}>
                <PostCard post={post} />
              </div>
            ))}
        </div>
        <PostPagination page={page} setPage={setPage} postCount={postCount} />
      </div>
    </div>
  );
};

export default Home;
