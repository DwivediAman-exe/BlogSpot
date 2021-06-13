import { useState, useMemo, useContext } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import omitDeep from 'omit-deep';
import { PROFILE } from '../../graphql/queries';
import UserProfile from '../../components/forms/UserProfile';
import FileUpload from '../../components/FileUpload';
import { USER_UPDATE } from '../../graphql/mutations';
import { AuthContext } from '../../context/authContext';

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
        <FileUpload
          setValues={setValues}
          setLoading={setLoading}
          values={values}
          loading={loading}
        />
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
