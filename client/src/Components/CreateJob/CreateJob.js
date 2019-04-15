import React, { useState, useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
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
