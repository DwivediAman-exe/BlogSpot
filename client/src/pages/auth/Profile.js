import { useState, useMemo, useContext } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import omitDeep from 'omit-deep';
import { PROFILE } from '../../graphql/queries';
import UserProfile from '../../components/forms/UserProfile';
import { USER_UPDATE } from '../../graphql/mutations';
import { AuthContext } from '../../context/authContext';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';

const Profile = () => {
  const { state } = useContext(AuthContext);

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

  const fileResizeAndUpload = (e) => {
    setLoading(true);
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          300,
          300,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: state.user.token,
                  },
                }
              )
              .then((response) => {
                setLoading(false);
                console.log(response);
                setValues({ ...values, images: [...images, response.data] });
              })
              .catch((error) => {
                setLoading(false);
                console.log('Cloudinary upload failed error', error);
              });
          },
          'base64'
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        {
          public_id: id,
        },
        {
          headers: {
            authtoken: state.user.token,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        let filteredImages = images.filter((item) => {
          return item.public_id !== id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((error) => {
        setLoading(false);
        console.log('Delete image failed', error);
      });
  };

  return (
    <div className="container ps-3 pe-5 pu-3">
      <div className="row">
        <div className="col-md-12">
          {loading ? (
            <h4 className="text-warning text-center">Loading...</h4>
          ) : (
            <h2 className="text-danger text-center">Profile</h2>
          )}
        </div>
        <div className="col-md-3">
          <div className="form-outline mt-4">
            <label>Avatars</label>
            <input
              type="file"
              accept="image/*"
              onChange={fileResizeAndUpload}
              className="btn btn-outline-secondary btn-rounded form-control p-2 mt-2 ms-1 mb-2"
              style={{
                borderLeft: '2px solid gray',
                borderBottom: '2px solid gray',
              }}
            />
          </div>
        </div>
        <div className="col-md-9">
          {images.map((image) => (
            <img
              src={image.url}
              alt={image.public_id}
              key={image.public_id}
              style={{ height: '100px', margin: '2px', borderRadius: '20px' }}
              className="float-end"
              onClick={() => handleImageRemove(image.public_id)}
            />
          ))}
        </div>
      </div>
      <UserProfile
        {...values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
