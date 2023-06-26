import React from "react";

function SideMenu(props) {
  const { open, onClose } = props;
  return (
    <div>
      {open && (
        <div className="relative left-0 top-0 z-10 h-[100svh] w-48 border-black bg-white md:w-64">
          SideMenu
          <button className="absolute right-0" onClick={onClose}>
            Close Menu
          </button>
          <div className="absolute bottom-0 left-0 z-10">
            Some vectors and icons by{" "}
            <a href="https://www.svgrepo.com" target="_blank" rel="noreferrer">
              SVG Repo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideMenu;
