import React from "react";
import PropTypes from "prop-types";

function FormGroup(props) {
  const { label, placeholder, value, onChange, type, optionsArray } = props;
  let field = <input />;

  const handleChange = e => {
    onChange(e.target.value);
  };

  switch (type) {
    case "select":
      field = (
        <select
          onChange={handleChange}
          value={value}
          type={type || "text"}
          className="custom-select"
          id={label + "-form"}
          placeholder={placeholder}
        >
          {optionsArray}
        </select>
      );
      break;
    case "textarea":
      field = (
        <textarea
          className="form-control"
          onChange={handleChange}
          value={value}
          id={label + "-form"}
          placeholder={placeholder}
        />
      );
      break;
    default:
      field = (
        <input
          onChange={handleChange}
          value={value}
          type={type || "text"}
          className="form-control"
          id={label + "-form"}
          placeholder={placeholder}
        />
      );
  }

  return (
    <div className="form-group">
      {label && <label htmlFor={label + "-form"}>{label}</label>}
      {field}
    </div>
  );
}

FormGroup.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default FormGroup;
