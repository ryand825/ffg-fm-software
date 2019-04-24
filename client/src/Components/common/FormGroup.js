import React from "react";
import PropTypes from "prop-types";

function FormGroup(props) {
  const {
    label,
    placeholder,
    value,
    onChange,
    type,
    optionsArray,
    optionsKeyString,
    errorMessage
  } = props;
  let field = <input />;

  const handleChange = e => {
    onChange(e.target.value);
  };

  const handleSelect = e => {
    onChange(optionsArray[e.target.value]);
  };

  switch (type) {
    case "select":
      field = (
        <select
          onChange={handleSelect}
          type={type || "text"}
          className={
            errorMessage ? "custom-select is-invalid" : "custom-select"
          }
          id={label + "-form"}
          placeholder={placeholder}
          defaultValue=""
        >
          <option disabled value="">
            {label}
          </option>
          {optionsArray.map((option, key) => {
            return (
              <option key={"option" + key} value={key}>
                {option[optionsKeyString]}
              </option>
            );
          })}
        </select>
      );
      break;
    case "textarea":
      field = (
        <textarea
          className={errorMessage ? "form-control is-invalid" : "form-control"}
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
          className={errorMessage ? "form-control is-invalid" : "form-control"}
          id={label + "-form"}
          placeholder={placeholder}
        />
      );
  }

  return (
    <div className="form-group">
      {label && <label htmlFor={label + "-form"}>{label}</label>}
      {field}
      <div className="invalid-feedback">{errorMessage}</div>
    </div>
  );
}

FormGroup.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default FormGroup;
