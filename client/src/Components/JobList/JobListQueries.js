import { sp } from "@pnp/sp";

export function getJobList() {
  return sp.web.lists
    .getByTitle("service-jobs")
    .items // .filter(`Asset_x0020_LocationId eq '${currentLocation.Id}'`)
    .select(
      "Id",
      "Title",
      "Service_x0020_Location",
      "Service_x0020_Location/Id",
      "Service_x0020_Location/Title",
      "Assignee",
      "Assignee/Id",
      "Assignee/Title",
      "Status",
      "Status/Id",
      "Status/Title",
      "Assigned_x0020_Date"
    )
    .expand("Service_x0020_Location", "Assignee", "Status")
    .top(100)
    .get();
}
