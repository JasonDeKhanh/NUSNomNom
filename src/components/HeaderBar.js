import React from "react";

import { ReactComponent as MenuIcon } from "../icons/MenuIcon.svg";

import { useCampusesContext } from "../hooks/useCampusesContext";

function HeaderBar(props) {
  const { isOpenSideMenu, setIsOpenSideMenu } = props;
  const { dispatch, campuses, curCampus } = useCampusesContext();

  function handleChangeCurCampus(e) {
    // console.log(JSON.parse(e.target.value));
    // console.log(curCampus);
    dispatch({ type: "SET_CUR_CAMPUS", payload: JSON.parse(e.target.value) });
  }

  function isIOS() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  function isStandalone() {
    return isIOS() && window.navigator.standalone;
  }

  return (
    <div
      className={`${
        isOpenSideMenu ? "translate-x-0" : "-translate-x-48 md:-translate-x-56"
      } z-10 ${
        isStandalone() || !isIOS() ? "mt-12 md:mt-2" : "mt-2"
      } flex h-min w-[100vw] items-center justify-between transition-all duration-300 md:justify-start lg:mt-4`}
    >
      <div className="h-10">
        {!isOpenSideMenu && (
          <button className="ml-4" onClick={() => setIsOpenSideMenu(true)}>
            <MenuIcon className="h-10 w-10 rounded-full border-[0.75px] border-[#FFFFCC] bg-[#FFFFCC] fill-[#f9c03f]"></MenuIcon>
          </button>
        )}
      </div>
      <div className="h-10 w-64 rounded-3xl border border-[#FFFFCC] md:ml-4">
        <div className="flex h-full w-full justify-center overflow-hidden rounded-3xl border border-2 border-[#f9c03f] bg-slate-50">
          {curCampus && (
            <select
              onChange={handleChangeCurCampus}
              className="h-full w-full bg-slate-50 px-4 font-semibold text-[#875D00] accent-[#875D00] 
              focus:outline-none md:w-[95%]"
              value={JSON.stringify(curCampus)}
            >
              {campuses &&
                campuses.map((campus) => (
                  <option
                    className="bg-slate-50 font-medium"
                    key={campus._id}
                    value={JSON.stringify(campus)}
                  >
                    {campus.displayName}
                  </option>
                ))}
            </select>
          )}
        </div>
      </div>
      <div className="mr-4 w-10">
        {/* dummy to center drop down on mobile */}
      </div>
    </div>
  );
}

export default HeaderBar;
