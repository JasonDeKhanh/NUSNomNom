import React from "react";

function MenuItem(props) {
  const { menuItem } = props;
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{menuItem.foodName}</span>
        <span className="text-xs font-normal italic">{menuItem.foodDesc}</span>
      </div>
      <span className="text-xl font-normal">{menuItem.price.toFixed(2)}</span>
    </div>
  );
}

export default MenuItem;
