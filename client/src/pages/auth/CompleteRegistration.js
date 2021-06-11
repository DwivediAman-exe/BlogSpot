import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error('Please fill in the fields');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: { email: user.email, token: idTokenResult.token },
        });
        history.push('/');
      }
    } catch (error) {
      console.log('Register complete error', error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5 pt-3 ">
      {loading ? (
        <h4 className="text-warning">Loading...</h4>
      ) : (
        <h1 className="text-center">Complete Register</h1>
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
