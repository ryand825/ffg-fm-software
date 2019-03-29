import React from "react";

function Card(props) {
  const { children, header } = props;

  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
