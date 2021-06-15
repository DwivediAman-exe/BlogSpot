import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { SINGLE_POST } from '../../graphql/queries';
import { POST_UPDATE } from '../../graphql/mutations';
import omitDeep from 'omit-deep';
import FileUpload from '../../components/FileUpload';
import { useParams } from 'react-router-dom';

const PostUpdate = () => {
  const [values, setValues] = useState({
    content: '',
    title: '',
    image: {
      url: '',
      public_id: '',
    },
  });

  const { title, content, image } = values;
  const [loading, setLoading] = useState(false);

  const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);
  const [postUpdate] = useMutation(POST_UPDATE);

  const { postid } = useParams();

  useMemo(() => {
    if (singlePost) {
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        title: singlePost.singlePost.title,
        content: singlePost.singlePost.content,
        image: omitDeep(singlePost.singlePost.image, ['__typename']),
      });
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({ variables: { postId: postid } });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    postUpdate({ variables: { input: values } });
    setLoading(false);
    toast.success('Post Updated');
  };

  const UpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Create a eye-catching Title ! (max-length : 70 char)"
          maxLength="70"
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
        <h2 className="text-center text-danger">Update Post</h2>
      )}
      <div>
        <FileUpload
          values={values}
          loading={loading}
          setLoading={setLoading}
          setValues={setValues}
          singleUpload={true}
        />
        {UpdateForm()}
      </div>
    </div>
  );
};

export default PostUpdate;
