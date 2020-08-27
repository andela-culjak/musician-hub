import React, { Fragment } from "react";
import spinner from "./spinner.svg";

export default () => (
  <Fragment>
    <img
      src={spinner}
      className="my-3"
      style={{
        width: "150px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      }}
      alt="Loading..."
    />
  </Fragment>
);
