import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider, githubAuthProvider } from '../../firebase';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import AuthForm from '../../components/forms/AuthForm';

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const [userCreate] = useMutation(USER_CREATE);

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
            payload: { email: user.email, token: idTokenResult.token },
          });

          // send user info to our server mongodb to either update/create
          userCreate();
          history.push('/profile');
        });
    } catch (error) {
      console.log('login error', error);
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
        payload: { email: user.email, token: idTokenResult.token },
      });

      // send user info to our server mongodb to either update/create
      userCreate();
      history.push('/profile');
    });
  };

  const githubLogin = () => {
    auth.signInWithPopup(githubAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, token: idTokenResult.token },
      });

      // send user info to our server mongodb to either update/create
      userCreate();
      history.push('/profile');
    });
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <h4 className="text-warning">Loading...</h4>
      ) : (
        <h1 className="text-center">Log In</h1>
      )}
      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
        password={password}
        setPassword={setPassword}
        showPasswordInput={true}
      />
      <Link className="text-warning float-end" to="/password/forgot">
        Forgot Password..?
      </Link>
      <h4>OR</h4>
      <button
        onClick={googleLogin}
        className="btn btn-raised btn-danger btn-rounded mt-3 py-3 fs-7 me-5"
      >
        <i class="fab fa-google" /> LogIn with Google
      </button>
      <button
        onClick={githubLogin}
        className="btn btn-raised btn-rounded btn-outline-danger mt-3 py-3 fs-7"
      >
        <i class="fab fa-github" /> Login with Github
      </button>
    </div>
  );
};

export default Login;
