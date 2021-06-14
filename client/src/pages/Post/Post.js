import { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import FileUpload from '../../components/FileUpload';
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

  const handleSubmit = () => {
    //
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
        <h4 className="text-warning">Loading...</h4>
      ) : (
        <h2 className="text-center text-danger">Create Post</h2>
      )}
      <div className="row">
        <FileUpload
          values={values}
          loading={loading}
          setLoading={setLoading}
          setValues={setValues}
          singleUpload={true}
        />
        {createForm()}
      </div>
    </div>
  );
};

export default Post;
