import React from "react";
import PropTypes from "prop-types";

function InfoPill(props) {
  const { pillTitle, pillContent } = props;

  return (
    <div className="col-auto">
      <div className="input-group input-group-sm mb-2 ">
        <div className="input-group-prepend">
          <small className="input-group-text font-weight-light">
            {pillTitle}
          </small>
        </div>
        <div className="form-control">{pillContent || "N/A"}</div>
      </div>
    </div>
  );
}

InfoPill.propTypes = {
  pillTitle: PropTypes.string.isRequired,
  pillContent: PropTypes.string
};

export default InfoPill;
