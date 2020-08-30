import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({ deleteAccount, auth: { user }, profile: { profile, loading } }) => {
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="bg-tr-secondary p-2 p-sm-1">
      <p className="medium my-1">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile ? (
        <Fragment>
          <DashboardActions user={user} />
          <Experience experience={profile.experience} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p> You have not yet setup a profile. You can start here. </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
