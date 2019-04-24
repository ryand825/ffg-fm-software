import React from "react";

import { InputGroup, FormControl } from "react-bootstrap";

function EditJobDate(props) {
  const { assignedDate, setAssignedDate } = props;
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>Assigned Date</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        type="date"
        value={assignedDate}
        onChange={e => setAssignedDate(e.target.value)}
      />
    </InputGroup>
  );
}

export default EditJobDate;
