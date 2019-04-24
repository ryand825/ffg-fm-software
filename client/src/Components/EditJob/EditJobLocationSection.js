import React, { useState } from "react";
import { Form, InputGroup, Button, Modal, Spinner } from "react-bootstrap";

import { getLocationList } from "./EditJobQueries";

import InfoPills from "../common/InfoPills/InfoPills";
import AutoComplete from "../common/AutoComplete";

function EditJobLocationSection(props) {
  const { location, setLocation } = props;

  const [editMode, setEditMode] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [locationSelection, setLocationSelection] = useState();

  const handleEdit = () => {
    if (locationList[0]) {
      setEditMode(true);
    } else {
      setLocationList(["loading"]);

      getLocationList().then(res => {
        console.log(res);
        setLocationList(res);
        setEditMode(true);
      });
    }
  };

  const handleSubmit = () => {
    setLocation(locationSelection);
    setEditMode(false);
  };

  return (
    <>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Location</Form.Label>
        <InputGroup>
          <Form.Control value={location.Title} readOnly type="text" />
          <InputGroup.Append>
            {locationList[0] === "loading" ? (
              <Button variant="outline-secondary" disabled>
                <Spinner animation="grow" size="sm" />
              </Button>
            ) : (
              <Button variant="outline-secondary" onClick={handleEdit}>
                <i className="fas fa-edit" />
              </Button>
            )}
          </InputGroup.Append>
        </InputGroup>
        <InfoPills
          infoArray={[
            {
              title: "Address",
              content: location.Street
            },
            { title: "City", content: location.City },
            { title: "State", content: location.State },
            { title: "Zip", content: location.PostalCode }
          ]}
        />
      </Form.Group>
      <hr className="seperator" />
      <InfoPills
        infoHeader="Primary Contact"
        infoArray={[
          {
            title: "Name",
            content: location.Manager
          },
          { title: "Phone", content: location.contactPhone },
          { title: "Email", content: location.contactEmail }
        ]}
      />

      {editMode && (
        <>
          <Modal show={editMode} onHide={() => setEditMode(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Change Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AutoComplete
                keyString="Title"
                label="Choose Location"
                setData={setLocationSelection}
                itemArray={locationList}
              />
            </Modal.Body>
            <Modal.Footer>
              {locationList[0] !== "loading" ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Close
                  </Button>
                  <Button
                    disabled={!locationSelection}
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Spinner animation="border" />
              )}
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default EditJobLocationSection;
