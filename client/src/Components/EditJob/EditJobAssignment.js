import React, { useState, useEffect } from "react";

import { getTechList } from "./EditJobQueries";

import { ListGroup, Form } from "react-bootstrap";

function EditJobAssignment(props) {
  const { assignedTechs, setAssignedTechs } = props;
  const [techList, setTechList] = useState([]);

  useEffect(() => {
    getTechList().then(res => {
      setTechList(res);
    });
  }, []);

  const assignedMap =
    assignedTechs.length > 0 &&
    assignedTechs.map(tech => {
      return (
        <ListGroup.Item
          className="d-flex justify-content-between align-items-center"
          action
          onClick={() => removeTech(tech.Id)}
          key={`tech${tech.Id}`}
        >
          {tech.Title}
          <i className="fas fa-times fa-2x text-danger" />
        </ListGroup.Item>
      );
    });

  const techListFiltered = techList.filter(tech => {
    return (
      assignedTechs.filter(assigned => {
        return assigned.Id === tech.Id;
      }).length <= 0
    );
  });

  const techListMap = techListFiltered.map((tech, key) => {
    return (
      <option key={`tech-option-${tech.Id}`} value={key}>
        {tech.Title}
      </option>
    );
  });

  const removeTech = id => {
    setAssignedTechs(
      assignedTechs.filter(tech => {
        return tech.Id !== id;
      })
    );
  };

  const handleSelect = e => {
    const techArray = [...assignedTechs, techListFiltered[e.target.value]];
    e.target.value = "";
    setAssignedTechs(techArray);
  };

  return (
    <ListGroup>
      <Form.Label>Assigned Techs</Form.Label>
      {techListFiltered.length > 0 && (
        <ListGroup.Item className="p-2">
          <Form.Group className="m-0">
            <Form.Control
              onChange={e => handleSelect(e)}
              as="select"
              defaultValue=""
            >
              <option disabled value="">
                Add Tech...
              </option>
              {techListMap}
            </Form.Control>
          </Form.Group>
        </ListGroup.Item>
      )}
      {assignedMap}
    </ListGroup>
  );
}

export default EditJobAssignment;
