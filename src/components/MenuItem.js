import React from "react";

function MenuItem(props) {
  const { menuItem } = props;
  return (
    <div className="break-inside-avoid-column md:pr-4 xl:pr-8">
      {menuItem && (
        <div className="mb-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium md:text-base">
              {menuItem.foodName}
            </span>
            <span className="text-xs font-normal italic md:text-sm">
              {menuItem.foodDesc}
            </span>
          </div>
          <span className="text-lg font-normal md:text-xl">
            {menuItem.price.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}

export default MenuItem;
