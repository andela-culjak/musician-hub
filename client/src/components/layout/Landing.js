import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  const tourPoints = [
    {
      icon: "/img/svg/drum.png",
      title: "Find bandmates in your local area",
      description:
        "Looking for a drummer or want to gather an entire crew? This would be a good place to start looking. ",
    },
    {
      icon: "/img/svg/ipod.png",
      title: "Promote your stuff",
      description:
        "Music is made to be enjoyed and recognized. Share your band's or solo material with the whole community and get some feedback. ",
    },
    {
      icon: "/img/svg/quaver.png",
      title: "Discuss music and share ideas",
      description:
        "You can find people with similar musical influences and interests, but even the opposed opinions can lead to enjoable and mind-opening discussions.",
    },
  ];

  return (
    <section id="main-background">
      <div className="landing-top">
        <h1 className="x-large logo landing-logo">MusicianHub</h1>
        <h3 className="lead py-1 text-center text-white txt-shadow-dark">
          Music is created by getting together.
        </h3>
        <div className="buttons my-1">
          <Link to="register" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="login" className="btn btn-tr-primary">
            Login
          </Link>
        </div>
      </div>

      <div className="landing-intro bg-tr-dim text-center p-3 p-sm-2">
        <h2 className="large fw-400 txt-sh-primary my-3 my-sm-1">
          {" "}
          QUICK TOUR OR MUSICIAN HUB
        </h2>
        {tourPoints.map((point) => (
          <div key={point.title} className="tour-point my-2 my-sm-1">
            <div>
              <img src={point.icon} className="my-1 tour-icon" alt="icon" />
            </div>

            <h4 className="medium-large fw-500 my-05">{point.title}</h4>
            <p className="my-05 text-center">{point.description}</p>
          </div>
        ))}
      </div>

      <div className="landing-members bg-tr-secondary"></div>
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
