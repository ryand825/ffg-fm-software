import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";

import { getJobById, updateJobData } from "./EditJobQueries";

import EditJobLocationSection from "./EditJobLocationSection";
import EditJobDescription from "./EditJobDescription";
import EditJobAssignment from "./EditJobAssignment";
import EditJobDate from "./EditJobDate";
import EditJobStatus from "./EditJobStatus";
import EditJobTasks from "./EditJobTasks";
import Loading from "../common/Loading";

function EditJob(props) {
  const { jobId } = props;

  const [location, setLocation] = useState({ Title: "Loading..." });
  const [jobDescription, setJobDescription] = useState("");
  const [assignedTechs, setAssignedTechs] = useState([]);
  const [assignedDate, setAssignedDate] = useState("");
  const [currentStatusId, setCurrentStatusId] = useState({});
  const [jobTasks, setJobTasks] = useState([]);

  useEffect(() => {
    getJobById(props.jobId).then(res => {
      console.log(res);
      setLocation(res.Service_x0020_Location);
      setJobDescription(res.Title);
      setAssignedTechs(res.Assignee.results);
      const date = new Date(res.Assigned_x0020_Date)
        .toISOString()
        .split("T")[0];
      setAssignedDate(date);
      setCurrentStatusId(res.Status.Id);
      setJobTasks(res.Tasks.results);
    });
  }, []);

  const handleSubmit = () => {
    updateJobData(jobId, {
      Service_x0020_LocationId: location.Id,
      Title: jobDescription,
      AssigneeId: { results: assignedTechs.map(tech => tech.Id) },
      Assigned_x0020_Date: assignedDate,
      StatusId: currentStatusId
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log("Error", err));
  };

  const loading = location.Title === "Loading...";

  return (
    <Container>
      <Card>
        <Card.Header>Edit Job</Card.Header>
        <Card.Body>
          {/* {loading && <Spinner animation="border" />} */}
          <Loading isLoading={loading}>
            <Row>
              <Col md="6">
                <EditJobLocationSection
                  location={location}
                  setLocation={setLocation}
                />
                <hr className="seperator" />
                <EditJobDescription
                  description={jobDescription}
                  setJobDescription={setJobDescription}
                />
              </Col>
              <Col md="6">
                <EditJobStatus
                  currentStatusId={currentStatusId}
                  setCurrentStatusId={setCurrentStatusId}
                />
                <hr className="seperator" />
                <EditJobAssignment
                  assignedTechs={assignedTechs}
                  setAssignedTechs={setAssignedTechs}
                />
                <hr className="seperator" />
                <EditJobDate
                  assignedDate={assignedDate}
                  setAssignedDate={setAssignedDate}
                />
                <EditJobTasks
                  jobTasks={jobTasks}
                  setJobTasks={setJobTasks}
                  jobId={jobId}
                />
              </Col>
            </Row>
          </Loading>
        </Card.Body>
        {!loading && (
          <Card.Footer className="d-flex justify-content-end">
            <Button onClick={handleSubmit}>Submit</Button>
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
}

export default EditJob;
