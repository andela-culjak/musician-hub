import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadTrack from "../profile-forms/UploadTrack";
import { getMusicById, deleteTrack } from "../../actions/music";

const ManageTracks = ({ music, auth, getMusicById, deleteTrack }) => {
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    track: null,
  });

  useEffect(() => {
    auth.isAuthenticated && getMusicById(auth.user._id);
  }, [auth, getMusicById]);

  const confirmDeletingTrack = () => {
    deleteTrack(
      deleteModal.track.url.substring(deleteModal.track.url.lastIndexOf("/") + 1),
      music._id,
      auth.user._id,
      deleteModal.track._id
    );
    setDeleteModal({ show: false, track: null });
  };

  return (
    <>
      <div className="p-3">
        <h1 className="large text-primary mb-3">Manage my music</h1>
        {music ? (
          <Fragment>
            <div className="mb-1">
              <h2>My tracks:</h2>
              {music.tracks.map((track) => (
                <div
                  key={track._id}
                  className="manage-tracks-list-item bg-tr-primary my-1 p-1">
                  {track.title}
                  <button
                    onClick={(e) => setDeleteModal({ show: true, track: track })}
                    className="btn delete-track-btn">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </Fragment>
        ) : auth.isAuthenticated && !music ? (
          <h3>Make your music heard. Start by uploading some tracks. </h3>
        ) : (
          ""
        )}

        <UploadTrack />
      </div>

      <div hidden={!deleteModal.show} className="dark-overlay">
        <div className="modal bg-white" id="modal">
          <h4 className="modal-content p-1">
            Deleting track will also permanently erase comments and likes. Want to
            continue?
          </h4>

          <div className="modal-actions py-05">
            <button className="btn toggle-button" onClick={() => confirmDeletingTrack()}>
              Yes
            </button>

            <button
              className="btn toggle-button"
              onClick={() => setDeleteModal({ show: false, track: null })}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ManageTracks.propTypes = {
  music: PropTypes.shape({}),
  auth: PropTypes.shape({}),
  getMusicById: PropTypes.func.isRequired,
  deleteTrack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  music: state.music.music,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMusicById, deleteTrack })(
  withRouter(ManageTracks)
);
