import React, { useState } from "react";

function AddTasks(props) {
  const { taskList, setTaskList } = props;
  const [formValue, setFormValue] = useState("");

  const addTask = () => {
    setTaskList([...taskList, formValue]);
    setFormValue("");
  };

  const deleteTask = (e, index) => {
    e.preventDefault();
    let newList = [...taskList];
    newList.splice(index, 1);

    setTaskList(newList);
  };

  const disabled = formValue ? false : true;

  const taskMap = taskList.map((task, key) => {
    return (
      <li
        key={"task" + key}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {task}
        <button
          onClick={e => deleteTask(e, key)}
          className="btn btn-outline-danger"
        >
          Delete
        </button>
      </li>
    );
  });
  return (
    <>
      <label htmlFor="">Add Tasks</label>
      <form className="mb-2">
        <ul className="list-group">
          <li className="list-group-item input-group">
            <div className="input-group">
              <input
                value={formValue}
                onChange={e => setFormValue(e.target.value)}
                type="text"
                className="form-control"
                placeholder="New Task..."
              />
              <div className="input-group-append">
                <button
                  disabled={disabled}
                  onClick={addTask}
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
          </li>
          {taskMap}
        </ul>
      </form>
    </>
  );
}

export default AddTasks;
