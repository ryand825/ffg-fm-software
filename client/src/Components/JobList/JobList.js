import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { navigate } from "@reach/router";

import Paging from "../common/Paging";

import { getJobList } from "./JobListQueries";

function JobList() {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, getPerPage] = useState(10);

  useEffect(() => {
    getJobList().then(jobs => {
      setJobList(jobs);
    });
  }, []);

  const jobTable = jobList
    .filter((job, key) => {
      return key < page * perPage && key >= (page - 1) * perPage;
    })
    .map(job => {
      const jobDate = new Date(job.Assigned_x0020_Date);

      return (
        <tr key={"Job" + job.Id}>
          <td>{job.Title}</td>
          <td>{job.Service_x0020_Location.Title}</td>
          <td>{job.Status.Title}</td>
          <td>{jobDate.toDateString()}</td>
          <td>
            {job.Assignee.results.map(tech => {
              return (
                <span key={job.Id + "Tech" + tech.Id}>{`${tech.Title}, `}</span>
              );
            })}
          </td>
          <td>
            <Button
              onClick={() =>
                navigate(`/sites/devnet/test/index.aspx/edit-job/${job.Id}`)
              }
              variant="outline-secondary"
            >
              <i className="fas fa-edit" />
            </Button>
          </td>
        </tr>
      );
    });

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>{jobTable}</tbody>
      </Table>
      <Paging
        listLength={jobList.length}
        getPage={setPage}
        getPerPage={getPerPage}
      />
    </Container>
  );
}

export default JobList;
