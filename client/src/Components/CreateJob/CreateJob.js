import React, { useState, useEffect, useLayoutEffect } from "react";
import { sp } from "@pnp/sp";

import AddTasks from "./AddTasks";
import AssetSelector from "./AssetSelector";
import FormGroup from "../common/FormGroup";
import AutoComplete from "../common/AutoComplete";
import Card from "../common/Card";
import InfoPills from "../common/InfoPills/InfoPills";
import Spinner from "../common/Spinner";

function CreateJob() {
  const nowISO = new Date().toISOString().split("T")[0];

  const [locationList, setLocationList] = useState([]);
  const [techList, setTechList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [selectedDate, setSelectedDate] = useState(nowISO);
  const [taskList, setTaskList] = useState([]);
  const [assignee, setAssignee] = useState("Unassigned");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedAsset, setSelectedAsset] = useState({});
  const [errors, setErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  useLayoutEffect(() => {
    const batchLocTech = sp.createBatch();

    sp.web.lists
      .getByTitle("service-locations")
      .items.inBatch(batchLocTech)
      .get()
      .then(locations => {
        setLocationList(locations);
      });

    sp.web.lists
      .getByTitle("service-technicians")
      .items.inBatch(batchLocTech)
      .get()
      .then(technicians => setTechList(technicians));

    batchLocTech.execute();
  }, []);

  useEffect(() => {
    if (currentLocation.ID) {
      setAssetList(["loading"]);
      sp.web.lists
        .getByTitle("service-location-assets")
        .items.filter(`Asset_x0020_LocationId eq '${currentLocation.Id}'`)
        .select(
          "Id",
          "Title",
          "Asset_x0020_Model",
          "Asset_x0020_Model/Title",
          "Asset_x0020_Model/Id",
          "Asset_x0020_Model/Description"
        )
        .expand("Asset_x0020_Model")
        .get()
        .then(assets => setAssetList(assets));
    }
  }, [currentLocation]);

  const handleSubmit = e => {
    e.preventDefault();

    let tempErrors = {
      error: false,
      location: "",
      jobDescription: ""
    };

    if (!currentLocation.Id) {
      tempErrors.location = "Location must be selected.";
      tempErrors.error = true;
    }
    if (jobDescription.length < 1) {
      tempErrors.description = "Description is required";
      tempErrors.error = true;
    }

    if (tempErrors.error) {
      setErrors(tempErrors);
    } else {
      setErrors({});
      setSubmitLoading(true);
      const newJob = {
        Assigned_x0020_Date: selectedDate,
        Title: jobDescription,
        StatusId: 1,
        AssigneeId: assignee.Id && { results: [assignee.Id] },
        Service_x0020_LocationId: currentLocation.Id,
        AssetId: selectedAsset.assetId && selectedAsset.assetId
      };
      if (taskList.length > 0) {
        const taskBatch = sp.createBatch();
        let taskIdArray = [];

        taskList.forEach(Title => {
          sp.web.lists
            .getByTitle("service-job-tasks")
            .items.inBatch(taskBatch)
            .add({ Title })
            .then(iar => {
              taskIdArray.push(iar.data.Id);
              console.log(taskIdArray);
            });
        });

        taskBatch.execute().then(() => {
          createJob({ TasksId: { results: taskIdArray }, ...newJob });
        });
      } else {
        createJob(newJob);
      }

      function createJob(jobObject) {
        sp.web.lists
          .getByTitle("service-jobs")
          .items.add(jobObject)
          .then(iar => {
            console.log(iar);
          });
      }
    }
  };

  if (locationList.length > 0) {
    return (
      <div className="container">
        <div className="form">
          <Card header="Create Job">
            <div className="row">
              <div className="col-md">
                {/* Location form */}
                <AutoComplete
                  keyString="Title"
                  label="Choose Location"
                  setData={setCurrentLocation}
                  itemArray={locationList}
                  errorMessage={errors.location}
                />
                <hr className="seperator" />
                {/* Location Info */}
                <InfoPills
                  infoHeader="Location Info"
                  infoArray={[
                    {
                      title: "Address",
                      content: currentLocation.Street
                    },
                    { title: "City", content: currentLocation.City },
                    { title: "State", content: currentLocation.State },
                    { title: "Zip", content: currentLocation.PostalCode }
                  ]}
                />
                <hr className="seperator" />
                {/* Location Contact Info */}
                <InfoPills
                  infoHeader="Primary Contact"
                  infoArray={[
                    {
                      title: "Name",
                      content: currentLocation.Manager
                    },
                    { title: "Phone", content: currentLocation.contactPhone },
                    { title: "Email", content: currentLocation.contactEmail }
                  ]}
                />
                <hr className="seperator" />
                {/* Job description field */}
                <FormGroup
                  type="textarea"
                  value={jobDescription}
                  label="Job Description"
                  onChange={setJobDescription}
                  errorMessage={errors.description}
                />
                <hr className="seperator" />
                {/* Tech Selection */}
              </div>
              <div className="col-md">
                <FormGroup
                  type="select"
                  optionsKeyString="Title"
                  optionsArray={techList}
                  value={assignee}
                  label="Assign Tech"
                  onChange={setAssignee}
                />
                <hr className="seperator" />
                {/* Date picker */}
                <FormGroup
                  type="date"
                  value={selectedDate}
                  label="Scheduled Date"
                  onChange={setSelectedDate}
                />
                <hr className="seperator" />
                {/* Asset Selector */}
                <AssetSelector
                  assetList={assetList}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                />
                <hr className="seperator" />
                {/* Task List */}
                <AddTasks taskList={taskList} setTaskList={setTaskList} />{" "}
              </div>
            </div>
            <button
              onClick={e => handleSubmit(e)}
              type="submit"
              disabled={submitLoading}
              className="btn btn-outline-success btn-block mt-2"
            >
              {submitLoading ? (
                <>
                  <span className="spinner-grow spinner-grow-sm" />
                  Creating Job...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </Card>
        </div>
      </div>
    );
  } else {
    return <Spinner large />;
  }
}

export default CreateJob;
