import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Members</Link>
      </li>
      <li>
        <Link to="/posts">Newsfeed</Link>
      </li>
      <li>
        {user && (
          <Link to={`/profile/user/${user._id}`}>
            <img src={user.avatar} alt="" className="round-img" />{" "}
            <span> {user.name.split(" ")[0]} </span>
          </Link>
        )}
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar px-2 px-sm-1">
      <h1>
        <Link to="/" className="logo">
          <i className="fas fa-headphones-alt logo-icon" />
          <span className="logo-text"> MusicianHub </span>
        </Link>
      </h1>
      {!loading && <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
