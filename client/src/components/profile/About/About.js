import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ProfileInfo from "./ProfileInfo";
import ProfileExperience from "./ProfileExperience";

const About = ({ profile }) => (
  <div className="profile-about">
    <ProfileInfo profile={profile} />
    <div className="profile-exp bg-tr-secondary box-sh-subtle p-2 p-sm-1">
      <h2 className="text-primary">Experience</h2>
      {profile.experience.length > 0 ? (
        <Fragment>
          {profile.experience.map((experience) => (
            <ProfileExperience key={experience._id} experience={experience} />
          ))}
        </Fragment>
      ) : (
        <h4>No experiences listed </h4>
      )}
    </div>
  </div>
);

About.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default About;
