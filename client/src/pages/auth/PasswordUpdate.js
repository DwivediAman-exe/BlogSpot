import { useState, Fragment } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

const PasswordUpdate = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success('Password Updated Successfully');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container mt-3">
      {loading ? (
        <h4 className="text-warning text-center ">Loading...</h4>
      ) : (
        <h2 className="text-center text-danger">Update Password</h2>
      )}
      <AuthForm
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput={true}
        hideEmailInput={true}
      />
    </div>
  );
};

export default PasswordUpdate;
