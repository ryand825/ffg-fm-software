import React, { useState } from "react";

import AddTasks from "./AddTasks";
import FormGroup from "../common/FormGroup";
import AutoComplete from "../common/AutoComplete";
import Card from "../common/Card";
import InfoPills from "../common/InfoPills/InfoPills";

import locationData from "./locationData";
import assetData from "./assetData";

function CreateJob() {
  const techData = [{ name: "Ryan" }, { name: "Tom" }];
  const nowISO = new Date().toISOString().split("T")[0];

  const [currentLocation, setCurrentLocation] = useState({});
  const [selectedDate, setSelectedDate] = useState(nowISO);
  const [taskList, setTaskList] = useState([]);
  const [assignee, setAssignee] = useState("Unassigned");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedAsset, setSelectedAsset] = useState({});
  const [isAsset, toggleAsset] = useState(false);

  return (
    <div className="container">
      <form className="form">
        <Card header="Create Job">
          <div className="form-row">
            <div className="col-md">
              {/* Location form */}
              <AutoComplete
                keyString="locationName"
                label="Choose Location"
                setData={setCurrentLocation}
                itemArray={locationData}
              />

              <hr className="seperator" />
              {/* Location Info */}
              <InfoPills
                infoHeader="Location Info"
                infoArray={[
                  {
                    title: "Address",
                    content: currentLocation.locationAddress
                  },
                  { title: "City", content: currentLocation.locationCity },
                  { title: "State", content: currentLocation.locationState },
                  { title: "Zip", content: currentLocation.locationZip }
                ]}
              />
              <hr className="seperator" />
              {/* Location Contact Info */}
              <InfoPills
                infoHeader="Primary Contact"
                infoArray={[
                  {
                    title: "Name",
                    content:
                      currentLocation.contactFirst &&
                      `${currentLocation.contactFirst} ${
                        currentLocation.contactLast
                      }`
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
              />
              <hr className="seperator" />
            </div>
            <div className="col-md">
              {/* Tech Selection */}
              <FormGroup
                type="select"
                optionsArray={[{ name: "Unassigned" }, ...techData].map(
                  (option, key) => {
                    return (
                      <option key={"option" + key} value={option.name}>
                        {option.name}
                      </option>
                    );
                  }
                )}
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
              {isAsset ? (
                <>
                  <button
                    onClick={() => {
                      toggleAsset(false);
                      setSelectedAsset({});
                    }}
                    className="btn btn-outline-danger mb-2"
                  >
                    Remove Asset
                  </button>
                  <FormGroup
                    type="select"
                    optionsArray={assetData.map((option, key) => {
                      return (
                        <option key={"option" + key} value={option.name}>
                          {option.assetName}
                        </option>
                      );
                    })}
                    value={selectedAsset}
                    label="Select Asset"
                    onChange={setSelectedAsset}
                  />
                </>
              ) : (
                <button
                  onClick={() => toggleAsset(true)}
                  className="btn btn-outline-primary"
                >
                  Add Asset
                </button>
              )}
              <hr className="seperator" />
              {/* Task List */}
              <AddTasks taskList={taskList} setTaskList={setTaskList} />
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}

export default CreateJob;
