import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.css";

const modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          display: props.show ? "block" : "none",
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default modal;
