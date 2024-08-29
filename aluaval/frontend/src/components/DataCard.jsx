import React from "react";

const DataCard = ({ title, items, renderItem, onItemClick, clickable }) => {
  return (
    <div className="w3-card w3-light-grey w3-padding w3-margin-bottom">
      <div className="w3-container">
        <h3>{title}</h3>
        <ul>
          {items.map((item) =>
            clickable ? (
              <button
                key={item.id}
                className="w3-button w3-block w3-white w3-border w3-margin-bottom w3-center"
                onItemClick={() => onItemClick(item)}
              >
                {renderItem(item)}
              </button>
            ) : (
              <li key={item.id}>{renderItem(item)}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default DataCard;
