import React, { useState, useEffect } from "react";
import { sp } from "@pnp/sp";

import FormGroup from "../common/FormGroup";
import InfoPills from "../common/InfoPills/InfoPills";

function AssetSelector(props) {
  const { selectedAsset, setSelectedAsset, assetList } = props;

  const [isAsset, toggleAsset] = useState(false);
  const [modelIds, setModelIds] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  const { assetMake, assetModel, assetSerial } = selectedAsset;

  useEffect(() => {
    if (assetList.length > 0 && assetList[0] !== "loading") {
      setModelIds(
        assetList.reduce((accumulator, current) => {
          if (accumulator.indexOf(current.Id) === -1) {
            accumulator.push(current.Id);
          }
          return accumulator;
        }, [])
      );
    } else {
      setModelIds([]);
    }
  }, [assetList]);

  useEffect(() => {
    if (modelIds.length > 0) {
      let batchModelsByIds = sp.createBatch();
      let models = [];

      modelIds.forEach(id => {
        sp.web.lists
          .getByTitle("equipment-catalog")
          .items.getById(id)
          .select("Id", "Title", "Manufacturer", "Manufacturer/Title")
          .expand("Manufacturer")
          .inBatch(batchModelsByIds)
          .get()
          .then(item => {
            models.push(item);
          });
      });

      batchModelsByIds.execute().then(() => setManufacturers(models));
    }
  }, [modelIds]);

  const assetData = assetList.map(asset => {
    const {
      Asset_x0020_Model: AssetModel = {
        Title: "N/A",
        Id: "N/A",
        Description: "N/A"
      }
    } = asset;

    let assetMake = "";
    if (manufacturers.length > 0) {
      const mfrFilter = manufacturers.filter(model => {
        return model.Id === AssetModel.Id;
      })[0];

      assetMake = mfrFilter && mfrFilter.Manufacturer.Title;
    }

    return {
      assetMake,
      assetModel: AssetModel.Title,
      assetSerial: asset.Title,
      assetId: asset.Id,
      assetModelId: AssetModel.Id,
      assetName: AssetModel.Description,
      optionDisplay: `${assetMake} - ${AssetModel.Title} -
      ${AssetModel.Description}`
    };
  });

  const selectedAssetInfo = [
    { title: "Mfr", content: assetMake },
    { title: "M#", content: assetModel },
    { title: "S#", content: assetSerial }
  ];

  if (assetList.length > 0 && assetList[0] !== "loading") {
    return (
      <>
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
              optionsArray={assetData}
              optionsKeyString="optionDisplay"
              value={selectedAsset}
              label="Select Asset"
              onChange={setSelectedAsset}
            />
            <InfoPills infoArray={selectedAssetInfo} />
          </>
        ) : (
          <button
            onClick={() => toggleAsset(true)}
            className="btn btn-outline-primary"
          >
            Add Asset
          </button>
        )}
      </>
    );
  } else if (assetList[0] === "loading") {
    return (
      <button disabled className="btn btn-outline-primary">
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </button>
    );
  } else {
    return (
      <button disabled className="btn btn-danger disabled">
        No Assets Available
      </button>
    );
  }
}

export default AssetSelector;
