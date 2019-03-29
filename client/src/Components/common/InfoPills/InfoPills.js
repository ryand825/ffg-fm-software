import React from "react";
import PropTypes from "prop-types";

import InfoPill from "./InfoPill";

function InfoPills(props) {
  const { infoArray, infoHeader } = props;

  const pillArray = infoArray.map((data, key) => {
    return (
      <InfoPill
        key={data.title + key}
        pillTitle={data.title}
        pillContent={data.content}
      />
    );
  });

  return (
    <>
      <div className="mb-2">{infoHeader}</div>
      <div className="form-row">{pillArray}</div>
    </>
  );
}

InfoPills.propTypes = {
  infoArray: PropTypes.array.isRequired,
  infoHeader: PropTypes.string
};

export default InfoPills;
