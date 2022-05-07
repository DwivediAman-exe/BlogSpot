import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider, githubAuthProvider } from '../../firebase';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/forms/AuthForm';
import { USER_CREATE } from '../../graphql/mutations';

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
						payload: {
							email: user.email,
							token: idTokenResult.token,
						},
					});

					// send user info to our server mongodb to either update/create
					userCreate();
					history.push('/post/create');
				});
		} catch (error) {
			console.log('login error', error);
			toast.error(error.message);
			setLoading(false);
		}
	};

	// Login with Google with help of firebase
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
			history.push('/post/create');
		});
	};

	// Login with Github with help of firebase
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
			history.push('/post/create');
		});
	};

	return (
		<div className="container mt-4">
			{loading ? (
				<h4 className="text-warning text-center">Loading...</h4>
			) : (
				<h1 className="text-center">
					<i class="fas fa-user-check text-success"></i> Log In
				</h1>
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
			<Link
				className="text-warning float-end text-decoration-underline"
				to="/password/forgot"
			>
				Forgot Your Password..?
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
