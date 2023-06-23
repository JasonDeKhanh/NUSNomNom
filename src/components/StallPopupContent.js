import React, { useEffect, useState } from "react";

import { ReactComponent as BackIcon } from "../icons/BackIcon.svg";
import { ReactComponent as CloseIcon } from "../icons/CloseIcon.svg";

import { useCampusesContext } from "../hooks/useCampusesContext";
import Menu from "./Menu";

function StallPopupContent(props) {
  const { curEatery, curStall, dispatch } = useCampusesContext();

  // fetch menu!
  const [curMenu, setCurMenu] = useState(null);
  useEffect(() => {
    const fetchStallMenu = async () => {
      const apiString = "/api/stalls/getmenu/" + curStall._id;
      const response = await fetch(apiString);
      const json = await response.json();

      if (response.ok) {
        setCurMenu(json);
      }
    };

    fetchStallMenu();
  }, []);

  function handleBackButton() {
    setCurMenu(null);
    dispatch({ type: "REMOVE_CUR_STALL", payload: null });
  }

  return (
    <div className="h-full">
      <header
        className="h-min max-h-[40%] w-full bg-cover bg-center md:text-left"
        style={{ backgroundImage: `url(${curStall?.stallImageUrl})` }}
      >
        <div className="h-full bg-black bg-black/70 p-10 text-[#ffffcc] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
          {curStall && (
            <div className="flex h-full justify-center">
              <div className="flex flex-col justify-center text-center">
                <button
                  onClick={handleBackButton}
                  className="mb-4 flex items-center justify-center rounded-lg border border-[#ffffcc] px-2"
                >
                  <BackIcon className="h-5 w-5 fill-[#ffffcc]"></BackIcon>
                  <span className="ml-2 text-lg font-semibold">
                    {curEatery.name}
                  </span>
                </button>
                <h1 className="mb-2 text-5xl font-semibold lg:text-7xl">
                  {curStall.name}
                </h1>
                <span className="text-base font-medium">
                  Food Type: {curStall.foodType}
                </span>
                <span className="text-base font-medium">
                  Opening Hours: {curStall.openingHours}
                </span>
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="h-4/6 w-full overflow-y-scroll">
        <Menu menu={curMenu}></Menu>
      </main>
    </div>
  );
}

export default StallPopupContent;
