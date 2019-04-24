import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import { getStatusList } from "./EditJobQueries";

function EditJobStatus(props) {
  const { currentStatusId, setCurrentStatusId } = props;
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    getStatusList()
      .then(res => setStatusList(res))
      .catch(err => console.log(err));
  }, []);

  const statusListMap = statusList.map((status, key) => {
    return (
      <option key={`statusList${key}`} value={status.Id}>
        {status.Title}
      </option>
    );
  });

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Status</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        onChange={e => {
          setCurrentStatusId(e.target.value);
          console.log(e.target.value);
        }}
        as="select"
        value={currentStatusId}
        // defaultValue={currentStatusId}
      >
        {statusListMap}
      </Form.Control>
    </InputGroup>
  );
}

export default EditJobStatus;
