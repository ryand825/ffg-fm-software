import React, { useState } from "react";

import AddTasks from "./AddTasks";
import AssetSelector from "./AssetSelector";
import FormGroup from "../common/FormGroup";
import AutoComplete from "../common/AutoComplete";
import Card from "../common/Card";
import InfoPills from "../common/InfoPills/InfoPills";

import locationData from "./locationData";

function CreateJob() {
  const techData = [{ name: "Ryan" }, { name: "Tom" }, { name: "3rd Party" }];
  const nowISO = new Date().toISOString().split("T")[0];

  const [currentLocation, setCurrentLocation] = useState({});
  const [selectedDate, setSelectedDate] = useState(nowISO);
  const [taskList, setTaskList] = useState([]);
  const [assignee, setAssignee] = useState("Unassigned");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedAsset, setSelectedAsset] = useState({});

  return (
    <div className="container">
      <form className="form">
        <Card header="Create Job">
          {/* Location form */}
          <AutoComplete
            keyString="locationName"
            label="Choose Location"
            setData={setCurrentLocation}
            itemArray={locationData}
          />
          {/* Hides form if location is not selected */}
          {currentLocation.locationName && (
            <>
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
              {/* Tech Selection */}
              <FormGroup
                type="select"
                optionsKeyString="name"
                optionsArray={techData}
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
              <AssetSelector
                selectedAsset={selectedAsset}
                setSelectedAsset={setSelectedAsset}
              />
              <hr className="seperator" />
              {/* Task List */}
              <AddTasks taskList={taskList} setTaskList={setTaskList} />{" "}
            </>
          )}
        </Card>
      </form>
    </div>
  );
}

export default CreateJob;
