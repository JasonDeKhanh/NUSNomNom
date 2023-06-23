import React from "react";
import MenuSection from "./MenuSection";

function Menu(props) {
  const { menu } = props;

  return (
    <div>
      {menu && (
        <div className="p-4">
          {menu &&
            menu.map((menuSection) => (
              <MenuSection
                key={menuSection._id}
                menuSection={menuSection}
              ></MenuSection>
            ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
