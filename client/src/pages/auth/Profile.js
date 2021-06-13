import { useState, useMemo, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import omitDeep from 'omit-deep';
import { PROFILE } from '../../graphql/queries';
import { USER_UPDATE } from '../../graphql/mutations';

const Profile = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: omitDeep(data.profile.images, ['__typename']),
      });
    }
  }, [data]);

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      toast.success('Profile Updated');
    },
  });

  const { username, email, name, about, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userUpdate({
      variables: {
        input: values,
      },
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = () => {};

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mt-4">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Username"
          disabled={loading}
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Name"
          disabled={loading}
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="Email"
          disabled
        />
      </div>
      <div className="form-outline mt-4">
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control ps-3 pt-1 pb-1"
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <div className="form-outline mt-4">
        <label>About</label>
        <textarea
          name="about"
          value={about}
          onChange={handleChange}
          className="form-control ps-3 pt-1 pb-1"
          placeholder="About"
          disabled={loading}
          style={{ borderBottom: '1px solid gray' }}
        />
      </div>
      <button
        className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-3 fs-7"
        disabled={!email || loading}
      >
        Update Details
      </button>
    </form>
  );

  return (
    <div className="container ps-3 pe-5 pu-3">
      <h2 className="text-danger text-center">Profile</h2>
      {profileUpdateForm()}
    </div>
  );
};

export default Profile;
