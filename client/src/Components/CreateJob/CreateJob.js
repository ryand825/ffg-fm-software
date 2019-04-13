import React, { useState, useEffect, useLayoutEffect } from "react";

import AddTasks from "./AddTasks";
import AssetSelector from "./AssetSelector";
import FormGroup from "../common/FormGroup";
import AutoComplete from "../common/AutoComplete";
import Card from "../common/Card";
import InfoPills from "../common/InfoPills/InfoPills";
import Spinner from "../common/Spinner";

import {
  getLocationList,
  getTechnicianlist,
  getAssetsByLocationId
} from "../../api/graphService";

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

  useLayoutEffect(() => {
    const fetchData = async () => {
      const locationData = await getLocationList();
      setLocationList(locationData.value.map(value => value.fields));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const techData = await getTechnicianlist();
      setTechList(techData.value.map(value => value.fields));
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (currentLocation.id) {
      setAssetList(["loading"]);
      const fetchData = async () => {
        const assetData = await getAssetsByLocationId(currentLocation.id);
        setAssetList(assetData.value.map(value => value.fields));
      };
      fetchData();
    }
  }, [currentLocation]);

  if (locationList.length > 0) {
    return (
      <div className="container">
        <form className="form">
          <Card header="Create Job">
            {/* Location form */}
            <AutoComplete
              keyString="Title"
              label="Choose Location"
              setData={setCurrentLocation}
              itemArray={locationList}
            />
            {/* Hides form if location is not selected */}
            {currentLocation.Title && (
              <>
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
                />
                <hr className="seperator" />
                {/* Tech Selection */}
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
              </>
            )}
          </Card>
        </form>
      </div>
    );
  } else {
    return <Spinner large />;
  }
}

export default CreateJob;
