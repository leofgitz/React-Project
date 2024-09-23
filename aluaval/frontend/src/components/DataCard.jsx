import React from "react";

const DataCard = ({ title, items, renderItems }) => {
  const content = renderItems(items);
  return (
    <div className="w3-card w3-light-grey w3-padding w3-margin-bottom">
      <div className="w3-container">
        <h3>{title}</h3>
        <ul>{content}</ul>
      </div>
    </div>
  );
};

export default DataCard;
