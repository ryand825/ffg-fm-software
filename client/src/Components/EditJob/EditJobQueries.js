import { sp } from "@pnp/sp";

export function getJobById(id) {
  return sp.web.lists
    .getByTitle("service-jobs")
    .items.getById(id) // .filter(`Asset_x0020_LocationId eq '${currentLocation.Id}'`)
    .select(
      "Id",
      "Title",
      "Service_x0020_Location",
      "Service_x0020_Location/Id",
      "Service_x0020_Location/Title",
      "Service_x0020_Location/City",
      "Service_x0020_Location/PostalCode",
      "Service_x0020_Location/State",
      "Service_x0020_Location/Street",
      "Service_x0020_Location/Manager",
      "Assignee",
      "Assignee/Id",
      "Assignee/Title",
      "Status",
      "Status/Id",
      "Status/Title",
      "Assigned_x0020_Date",
      "Tasks",
      "Tasks/Id",
      "Tasks/Title",
      "Tasks/taskComplete"
    )
    .expand("Service_x0020_Location", "Assignee", "Status", "Tasks")
    .get();
}

export function getLocationList() {
  return sp.web.lists.getByTitle("service-locations").items.get();
}

export function getTechList() {
  return sp.web.lists
    .getByTitle("service-technicians")
    .items.select("Title", "Id")
    .get();
}

export function getStatusList() {
  return sp.web.lists
    .getByTitle("service-job-statuses")
    .items.select("Title", "Id")
    .get();
}

export function updateJobData(id, dataObj) {
  return sp.web.lists
    .getByTitle("service-jobs")
    .items.getById(id)
    .update(dataObj);
}

export async function addTasksToJob(id, Title) {
  const newTask = await sp.web.lists
    .getByTitle("service-job-tasks")
    .items.add({ Title });

  console.log(newTask);
  const {
    Id: newId,
    Title: newTitle,
    taskComplete: newTaskComplete
  } = newTask.data;

  const currentJobTasks = await sp.web.lists
    .getByTitle("service-jobs")
    .items.getById(id)
    .select("Tasks", "Tasks/Id", "Tasks/Title", "Tasks/taskComplete")
    .expand("Tasks")
    .get();

  const newTaskObject = {
    Id: newId,
    Title: newTitle,
    taskComplete: newTaskComplete
  };
  console.log(newTaskObject);
  let newTaskArray = currentJobTasks.Tasks.results.map(task => task);
  newTaskArray.push(newTaskObject);

  console.log(newTaskArray);

  await sp.web.lists
    .getByTitle("service-jobs")
    .items.getById(id)
    .select("Tasks", "Tasks/Id", "Tasks/Title", "Tasks/taskComplete")
    .expand("Tasks")
    .update({ TasksId: { results: newTaskArray.map(task => task.Id) } });

  return newTaskArray;
}

export const deleteJobTask = id => {
  return sp.web.lists
    .getByTitle("service-job-tasks")
    .items.getById(id)
    .delete();
};
