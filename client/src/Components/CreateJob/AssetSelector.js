import React, { useState } from "react";

import FormGroup from "../common/FormGroup";
import InfoPills from "../common/InfoPills/InfoPills";
import assetData from "./assetData";

function AssetSelector(props) {
  const { selectedAsset, setSelectedAsset } = props;

  const [isAsset, toggleAsset] = useState(false);

  const { assetMake, assetModel, assetSerial } = selectedAsset;

  const selectedAssetInfo = [
    { title: "Mfr", content: assetMake },
    { title: "M#", content: assetModel },
    { title: "S#", content: assetSerial }
  ];

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
            optionsKeyString="assetName"
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
}

export default AssetSelector;
