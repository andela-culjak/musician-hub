import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [filteredData, setFilteredData] = useState({
    query: "",
    filteredProfiles: profiles,
  });

  const onChange = (e) => {
    setFilteredData({
      query: e.target.value,
      filteredProfiles: profiles.filter((person) =>
        person.user.name.toLowerCase().includes(e.target.value.toLowerCase())
      ),
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Members</h1>
          <p className="lead">Browse and connect with fellow musicians</p>

          <div className="search-bar-container radius-2 px-1 my-1">
            <input
              type="text"
              className="search-bar "
              placeholder="Search"
              name="query"
              onChange={(e) => onChange(e)}
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          {
            <div className="profiles my-3">
              {profiles.length > 0 && filteredData.query.length > 0 ? (
                filteredData.filteredProfiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          }
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
