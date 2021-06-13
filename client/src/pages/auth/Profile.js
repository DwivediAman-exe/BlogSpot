import { useState, useMemo, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const PROFILE = gql`
  query {
    profile {
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

const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
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
      console.log(data.profile);
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: data.profile.images,
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
          placeholder="Image"
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
        className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 fs-7"
        disabled={!email || loading}
      >
        Update Details
      </button>
    </form>
  );

  return (
    <div>
      <h2 className="text-danger text-center p-4">Profile</h2>
      {profileUpdateForm()}
    </div>
  );
};

export default Profile;
