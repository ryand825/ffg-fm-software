import React, { useState, useEffect } from "react";

import FormGroup from "../common/FormGroup";
import InfoPills from "../common/InfoPills/InfoPills";
import { batchModelsByIds } from "../../api/graphService";
import idCollection from "../../api/idCollection";

const { siteId, equipmentCatalog } = idCollection;
const modelQueryPrefix = `/sites/${siteId}/lists/${equipmentCatalog}/items/`;
const modelQuerySuffix =
  "?$expand=fields($select=id,Title,Manufacturer_x003a_Title)";

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
          if (accumulator.indexOf(current.id) === -1) {
            accumulator.push(current.id);
          }
          return accumulator;
        }, [])
      );
    }
  }, [assetList]);

  useEffect(() => {
    if (modelIds.length > 0) {
      const requests = modelIds.map(id => {
        return {
          id,
          method: "GET",
          url: `${modelQueryPrefix}${id}${modelQuerySuffix}`
        };
      });
      const fetchData = async () => {
        const response = await batchModelsByIds(requests);
        setManufacturers(response.responses.map(res => res.body.fields));
      };
      fetchData();
    }
  }, [modelIds]);

  const assetData = assetList.map(asset => {
    let assetMake = "";
    if (manufacturers.length > 0) {
      assetMake = manufacturers.filter(model => {
        return model.id === asset.Asset_x0020_ModelLookupId;
      })[0].Manufacturer_x003a_Title;
    }

    return {
      assetMake,
      assetModel: asset.Asset_x0020_Model_x003a_Title,
      assetSerial: asset.Title,
      assetId: asset.id,
      assetModelId: asset.Asset_x0020_ModelLookupId,
      assetName: asset.Asset_x0020_Model_x003a_Descript,
      optionDisplay: `${assetMake} - ${asset.Asset_x0020_Model_x003a_Title} -
      ${asset.Asset_x0020_Model_x003a_Descript}`
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
