import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider, githubAuthProvider } from '../../firebase';

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: 'LOGGED_IN_USER',
            payload: { email: user.email, toekn: idTokenResult.token },
          });

          history.push('/');
        });
    } catch (error) {
      console.log('Login error', error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, toekn: idTokenResult.token },
      });

      history.push('/');
    });
  };

  const githubLogin = () => {
    auth.signInWithPopup(githubAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, toekn: idTokenResult.token },
      });

      history.push('/');
    });
  };

  return (
    <div className="container mt-5 pt-3 ">
      {loading ? (
        <h4 className="text-warning">Loading...</h4>
      ) : (
        <h1 className="text-center">Log In</h1>
      )}
      <form onSubmit={handleSubmit}>
        <div class="form-outline mt-5 w-100 p-2">
          <input
            type="email"
            id="typeEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control fs-2"
            disabled={loading}
          />
          <label class="form-label fs-3" for="typeEmail">
            Email Address
          </label>
        </div>
        <div class="form-outline mt-3 mb-3 w-100 p-2">
          <input
            type="password"
            id="typePassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control fs-3"
            disabled={loading}
          />
          <label class="form-label fs-3" for="typePassword">
            Password
          </label>
        </div>
        <button
          className="btn btn-primary btn-raised btn-lg mb-4"
          disabled={!email || !password || loading}
        >
          Login
        </button>
        <h2>OR</h2>
        <button
          onClick={googleLogin}
          className="btn btn-raised btn-danger mt-4 mb-5 btn-lg py-3 fs-5 me-5"
        >
          <i class="fab fa-google" /> LogIn with Google
        </button>
        <button
          onClick={githubLogin}
          className="btn btn-raised btn-outline-danger mt-4 mb-5 btn-lg py-3 fs-5"
        >
          <i class="fab fa-github" /> LogIn with Github
        </button>
      </form>
    </div>
  );
};

export default Login;
