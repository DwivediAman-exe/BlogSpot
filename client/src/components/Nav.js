import { Link, useHistory } from 'react-router-dom';
import { auth } from 'firebase';
import { AuthContext } from '../context/authContext';
import { useContext, Fragment } from 'react';
import Search from './Search';

const Nav = () => {
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

  const { user } = state;

  const logout = () => {
    auth().signOut();
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: null,
    });
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info p-2 fs-5">
      <div className="container-fluid">
        <Link className="navbar-brand pe-3 mb-1  fs-3" to="/">
          <i class="fas fa-mail-bulk ms-2 me-2 fs-2"></i> BlogSpot
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-1 mb-lg-0 ">
            <li className="nav-item">
              <Link className="nav-link me-2" to="/users">
                <i class="fas fa-user-friends fs-4 "></i> Members
              </Link>
            </li>
            {!user && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link me-2"
                    aria-current="page"
                    to="/login"
                  >
                    <i class="fas fa-user-check"></i> LogIn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i class="fas fa-user-plus"></i> Register
                  </Link>
                </li>
              </Fragment>
            )}
            {user && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <i class="fas fa-portrait"></i>{' '}
                    {user && user.email.split('@')[0]}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="/login"
                    onClick={logout}
                    className="nav-item 
							nav-link"
                  >
                    <i class="fas fa-sign-out-alt"></i> Logout
                  </a>
                </li>
              </Fragment>
            )}
          </ul>
          <div>
            <Search />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
