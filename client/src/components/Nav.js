import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info p-3 fs-4">
      <div className="container-fluid">
        <Link className="navbar-brand pe-4 fs-2" to="/">
          SocialApp
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
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                REGISTER
              </Link>
            </li>
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
