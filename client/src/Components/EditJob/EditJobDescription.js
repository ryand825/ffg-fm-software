import React from "react";
import { Form } from "react-bootstrap";

function EditJobDescription(props) {
  const { description, setJobDescription } = props;

  return (
    <Form.Group>
      <Form.Label>Description</Form.Label>
      <Form.Control
        value={description}
        onChange={e => setJobDescription(e.target.value)}
        as="textarea"
        rows="3"
      />
    </Form.Group>
  );
}

export default EditJobDescription;
