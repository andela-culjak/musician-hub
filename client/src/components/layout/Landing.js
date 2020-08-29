import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large logo landing-logo">MusicianHub</h1>
          <p className="lead py-1">Music is created by getting together.</p>
          <div className="buttons">
            <Link to="register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="login" className="btn btn-tr-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.protoTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
