import React from "react";

function Spinner(props) {
  const { large } = props;

  return (
    <div className="text-center">
      <div
        className="spinner-border"
        style={large && { height: "4em", width: "4em" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
