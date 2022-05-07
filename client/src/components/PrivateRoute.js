import { useState, useContext, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import LoadingToRedirect from './LoadingToRedirect';

const PrivateRoute = ({ ...rest }) => {
	const { state } = useContext(AuthContext);
	const [user, setUser] = useState(false);

	// if we have user in Global context update state
	useEffect(() => {
		if (state.user) {
			setUser(true);
		}
	}, [state.user]);

	const navLinks = () => (
		<nav className="container m-3 ps-4">
			<ul className="nav flex-column">
				<h2 className="text-warning mb-5">
					<i class="fas fa-user-cog fs-1"></i> Dashboard
				</h2>
				<li className="nav-item pb-2">
					<Link className="nav-link fs-4" to="/profile">
						<i class="fas fa-id-badge text-warning "></i> Profile
					</Link>
				</li>

				<li className="nav-item pb-2">
					<Link className="nav-link fs-4" to="/post/create">
						<i class="fas fa-copy text-warning"></i> Posts
					</Link>
				</li>
				<li className="nav-item pb-2">
					<Link className="nav-link fs-4" to="/password/update">
						<i class="fas fa-unlock-alt text-warning"></i> Password
					</Link>
				</li>
			</ul>
		</nav>
	);

	// for rendering private links and children components
	const renderContent = () => (
		<div className="container-fluid pt-5">
			<div className="row">
				<div className="col-md-3 pe-5">{navLinks()}</div>
				<div className="col-md-9">
					<Route {...rest} />
				</div>
			</div>
		</div>
	);

	return user ? renderContent() : <LoadingToRedirect path="/login" />;
};

export default PrivateRoute;
