import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profile";

const Landing = ({ isAuthenticated, getProfiles, profiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

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
        "Music is made to be enjoyed and recognized. Share your material with the whole community and get some feedback. ",
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
      <div className="dark-overlay"> </div>
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

      <div className="landing-intro bg-tr-dim text-center p-3 p-sm-2 txt-shadow-dark">
        <h2 className="large fw-400 txt-shadow-primary my-3 my-sm-1">
          QUICK TOUR OF MUSICIAN HUB
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
      {profiles.length > 0 && (
        <div className="bg-tr-secondary text-center p-2 txt-shadow-dark">
          <h2 className="large fw-500 my-1">COMMUNITY</h2>
          <p className="text-center medium-small fw-500 community-description">
            Sign up and take part in building a large community. Discover and stream their
            work.
          </p>
          <div className="landing-members py-2">
            {profiles
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((p) => (
                <div>
                  <img
                    src={p.user.avatar}
                    className="my-1 member-icon round-img box-sh-dark"
                    alt="icon"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

Landing.protoTypes = {
  getProfiles: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProfiles })(Landing);
