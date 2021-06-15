import { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import FileUpload from '../../components/FileUpload';
import { POST_CREATE } from '../../graphql/mutations';
import { POSTS_BY_USER } from '../../graphql/queries';
import PostCard from '../../components/PostCard';
import omitDeep from 'omit-deep';

const initialState = {
  title: '',
  content: '',
  image: {
    url: 'https://via.placeholder.com/200x200.png?text=POST',
    public_id: '123',
  },
};

const Post = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { title, content, image } = values;

  const [postCreate] = useMutation(POST_CREATE, {
    update: (cache, { data: { postCreate } }) => {
      const { postsByUser } = cache.readQuery({ query: POSTS_BY_USER });
      cache.writeQuery({
        query: POSTS_BY_USER,
        data: {
          postsByUser: [postCreate, ...postsByUser],
        },
      });
    },
    error: (err) => console.log(err.graphQLError[0].message),
  });

  const { data: posts } = useQuery(POSTS_BY_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    postCreate({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success('Post Created Successfully');
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Create a eye-catching Title !"
          maxLength="100"
          autoComplete="off"
          disabled={loading}
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label>Content</label>
        <textarea
          name="content"
          value={content}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Got Something engrossing ?"
          disabled={loading}
          autoComplete="off"
          rows="10"
          maxLength="1000"
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <button
        className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-4 fs-7"
        disabled={!content || !title || loading}
      >
        Submit Post
      </button>
    </form>
  );

  return (
    <div className="container mt-4">
      {loading ? (
        <h4 className="text-warning text-center ">Loading...</h4>
      ) : (
        <h2 className="text-center text-danger">Create Post</h2>
      )}
      <div>
        <FileUpload
          values={values}
          loading={loading}
          setLoading={setLoading}
          setValues={setValues}
          singleUpload={true}
        />
        {createForm()}
        <div className="row p-4">
          <h2 className="text-center text-danger">Your Posts</h2>
          {posts &&
            posts.postsByUser.map((post) => (
              <div className="col-md-6 pt-2" key={post._id}>
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
