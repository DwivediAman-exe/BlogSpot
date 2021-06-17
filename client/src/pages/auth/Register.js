import { useState } from 'react';
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

const Register = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };
    const result = await auth.sendSignInLinkToEmail(email, config);
    console.log('result', result);
    // show toast notification to user about email sent
    toast.success(
      `Registration Link sent to ${email}.
			\n click on the link to complete Registration`
    );
    // save user email to local storage
    window.localStorage.setItem('emailForRegistration', email);
    // clear state
    setEmail('');
    setLoading('');
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <h4 className="text-warning text-center">Loading...</h4>
      ) : (
        <h1 className="text-center">
          <i class="fas fa-user-plus text-success"></i> Register
        </h1>
      )}
      <AuthForm
        email={email}
        loading={loading}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
