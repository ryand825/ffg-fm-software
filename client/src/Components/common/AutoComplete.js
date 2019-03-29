import React from "react";

import Downshift from "downshift";

function AutoComplete(props) {
  const { itemArray, setData, keyString, label } = props;

  return (
    <Downshift
      onChange={selection => setData(selection)}
      itemToString={item => (item ? item[keyString] : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <label {...getLabelProps()}>{label}</label>
          <input className="form-control" {...getInputProps()} />
          <ul className="list-group" {...getMenuProps()}>
            {isOpen
              ? itemArray
                  .filter(
                    item =>
                      !inputValue ||
                      item[keyString]
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <button
                      className="list-group-item text-left"
                      {...getItemProps({
                        key: item[keyString],
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      {item[keyString]}
                    </button>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}

export default AutoComplete;
