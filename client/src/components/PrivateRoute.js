import { useState, useContext, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import LoadingToRedirect from './LoadingToRedirect';

const PrivateRoute = ({ ...rest }) => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  const navLinks = () => (
    <nav className="container m-5 ps-5 pe-5">
      <ul className="nav flex-column">
        <h2 className="text-warning mb-4">Dashboard</h2>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/password/update">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/post/create">
            Post
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-4 pe-5">{navLinks()}</div>
        <div className="col-md-8">
          <Route {...rest} />
        </div>
      </div>
    </div>
  );

  return user ? renderContent() : <LoadingToRedirect path="/login" />;
};

export default PrivateRoute;
