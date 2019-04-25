import React, { useState } from "react";
import { ListGroup, Form, InputGroup, Button, Spinner } from "react-bootstrap";

import { addTasksToJob, deleteJobTask } from "./EditJobQueries";

function EditJobTasks(props) {
  const { jobTasks, setJobTasks, jobId } = props;
  const [newTask, setNewTask] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState([]);

  const handleTaskSubmit = () => {
    setLoading(true);

    addTasksToJob(jobId, newTask).then(res => {
      setLoading(false);
      setJobTasks(res);
      setNewTask("");
    });
  };

  const handleDelete = taskId => {
    const deletingArray = [...deleting, taskId];
    setDeleting(deletingArray);

    deleteJobTask(taskId).then(res => {
      const updatedTaskList = jobTasks.filter(task => task.Id !== taskId);
      setJobTasks(updatedTaskList);
    });
  };

  const taskListMap = jobTasks.map(task => {
    const isDeleting = deleting.indexOf(task.Id) >= 0;
    return (
      <ListGroup.Item
        className="d-flex justify-content-between"
        key={"task" + task.Id}
      >
        <span>TODO:Check {task.Title}</span>
        <Button
          style={{ width: "42px" }}
          disabled={isDeleting}
          variant="danger"
          onClick={() => handleDelete(task.Id)}
        >
          {!isDeleting ? "X" : <Spinner size="sm" animation="grow" />}
        </Button>
      </ListGroup.Item>
    );
  });

  return (
    <ListGroup>
      <Form.Label>Tasks</Form.Label>
      <ListGroup.Item className="p-2">
        <InputGroup className="m-0">
          <Form.Control
            id="test"
            onChange={e => setNewTask(e.target.value)}
            value={newTask}
            disabled={isLoading}
          />
          <InputGroup.Append>
            <Button
              variant="outline-primary"
              onClick={handleTaskSubmit}
              type="submit"
              disabled={isLoading || newTask.length < 1}
            >
              {isLoading ? (
                <>
                  <Spinner animation="grow" size="sm" /> Creating Task
                </>
              ) : (
                <>Add Task</>
              )}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </ListGroup.Item>
      {taskListMap}
    </ListGroup>
  );
}

export default EditJobTasks;
