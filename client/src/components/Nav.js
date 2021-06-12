import { Link, useHistory } from 'react-router-dom';
import { auth } from 'firebase';
import { AuthContext } from '../context/authContext';
import { useContext, Fragment } from 'react';

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
        <Link className="navbar-brand pe-3 fs-3" to="/">
          SocialConnect
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!user && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link me-1"
                    aria-current="page"
                    to="/login"
                  >
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </Fragment>
            )}
            {user && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
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
                    Logout
                  </a>
                </li>
              </Fragment>
            )}
          </ul>
          <form className="d-flex input-group w-auto pe-5">
            <input
              type="search"
              className="form-control"
              aria-label="Search"
              placeholder="Search Post"
            />
            <button
              className="btn btn-dark"
              type="button"
              data-mdb-ripple-color="dark"
            >
              <i class="fas fa-search" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
