import React from "react";
import MenuItem from "./MenuItem";

function MenuSection(props) {
  const { menuSection } = props;
  return (
    <main className="mb-6">
      <div className="text-lg font-bold md:text-xl">
        {menuSection.sectionName}
      </div>
      <hr className="mb-1 border border-[1px] border-[#F9C03F]" />
      <div className="md:columns-2">
        {menuSection.menuItems.map((menuItem) => (
          <MenuItem key={menuItem._id} menuItem={menuItem}></MenuItem>
        ))}
      </div>
    </main>
  );
}

export default MenuSection;
