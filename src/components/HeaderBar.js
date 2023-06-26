import React from "react";

import { ReactComponent as MenuIcon } from "../icons/MenuIcon.svg";
import { useCampusesContext } from "../hooks/useCampusesContext";

function HeaderBar(props) {
  const { isOpenSideMenu, setIsOpenSideMenu } = props;
  const { dispatch, campuses } = useCampusesContext();

  function handleChangeCurCampus() {}

  return (
    <div className="z-10 mt-2 flex h-min items-center lg:mt-4">
      {!isOpenSideMenu && (
        <button
          className="ml-4 min-w-max overflow-hidden"
          onClick={() => setIsOpenSideMenu(true)}
        >
          {/* <MenuIconRounded className="h-11 w-11 rounded-full border border-[#FFFFCC] fill-[#f9c03f]"></MenuIconRounded> */}
          <MenuIcon className="h-10 w-10 rounded-full border-[0.75px] border-[#FFFFCC] bg-[#FFFFCC] fill-[#f9c03f]"></MenuIcon>
        </button>
      )}
      <select
        onChange={handleChangeCurCampus}
        className="ml-4 h-10 rounded-3xl border border-2 border-[#f9c03f] bg-slate-50"
      >
        {campuses.map((campus) => (
          <option key={campus._id} value={JSON.stringify(campus)}>
            {campus.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HeaderBar;
