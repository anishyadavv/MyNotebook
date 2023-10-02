import React from "react";

const Alert = (props) => {
  return (
    <div>
      <div className="warning d-flex align-items-center justify-content-center" role="alert">
        <h3>
          {props.message}
          <i className="mx-2 fa-solid fa-square-check"></i>
        </h3>
      </div>
    </div>
  );
};

export default Alert;
