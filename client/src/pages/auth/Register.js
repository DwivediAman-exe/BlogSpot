import { useState } from 'react';
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';

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
    <div className="container mt-5 pt-3 ">
      {loading ? (
        <h4 className="text-warning">Loading...</h4>
      ) : (
        <h1 className="text-center">Register</h1>
      )}
      <form onSubmit={handleSubmit}>
        <div class="form-outline mt-5 w-100 p-3">
          <input
            type="email"
            id="typeEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control fs-2"
            disabled={loading}
          />
          <label class="form-label fs-3" for="typeEmail">
            Enter Your Email Address
          </label>
        </div>
        <button
          className="btn btn-primary btn-raised btn-lg"
          disabled={!email || loading}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
