import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CompleteRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = () => {};

  return (
    <div className="container mt-5 pt-3 ">
      {loading ? (
        <h4 className="text-warning">Loading</h4>
      ) : (
        <h1 className="text-center">Register</h1>
      )}
      <form onSubmit={handleSubmit}>
        <div class="form-outline mt-5 w-100 ">
          <label class="form-label fs-3" for="typeEmail">
            Your Email
          </label>
          <input
            type="email"
            id="typeEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control fs-2"
            disabled
          />
        </div>
        <div class="form-outline mt-5 w-100 p-3">
          <input
            type="password"
            id="typePassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control fs-3"
            disabled={loading}
          />
          <label class="form-label fs-3" for="typePassword">
            Set Your Password
          </label>
        </div>
        <div class="row mb-4">
          <div class="col">
            <a href="#!">Forgot password?</a>
          </div>
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

export default CompleteRegistration;
