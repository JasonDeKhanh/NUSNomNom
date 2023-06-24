import React, { useEffect, useRef, useState } from "react";

import { useCampusesContext } from "../hooks/useCampusesContext";
import Menu from "./Menu";

import { ReactComponent as BackIcon } from "../icons/BackIcon.svg";
import { ReactComponent as ArrowDownIcon } from "../icons/ArrowDown.svg";
import { ReactComponent as LoadingIcon } from "../icons/LoadingSpinner.svg";

function StallPopupContent() {
  const { curEatery, curStall, dispatch } = useCampusesContext();

  // Handle scroll indicator
  const menuRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const isComponentMounted = useRef(true); // prevent bug where popup is closed too quickly after scrolling

  const handleScroll = () => {
    if (!isComponentMounted.current) return;

    // scrollHeight and clientHeight and scrollTop are all HTML properties of DOM elements, already given
    const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
    const isScrollable = scrollHeight > clientHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // Add a small buffer to determine the bottom

    setShowScrollIndicator(isScrollable && !isAtBottom);
  };

  useEffect(() => {
    if (!menuRef.current) return; // Add null check

    const menuElement = menuRef.current;

    if (menuElement.scrollHeight > menuElement.clientHeight) {
      setShowScrollIndicator(true);
    }

    menuRef.current.addEventListener("scroll", handleScroll);
    return () => {
      isComponentMounted.current = false;
      if (!menuRef.current) return; // Add null check
      menuRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        className="h-2/6 w-full bg-cover bg-center md:text-left"
        style={{ backgroundImage: `url(${curStall?.stallImageUrl})` }}
      >
        <div className="h-full bg-black bg-black/70 p-10 text-[#ffffcc] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
          {curStall && (
            <div className="flex h-full justify-center md:justify-start">
              <div className="flex flex-col justify-center text-center md:text-left">
                <button
                  onClick={handleBackButton}
                  className="mb-4 flex w-fit items-center justify-center rounded-lg border border-[#ffffcc] px-2"
                >
                  <BackIcon className="h-5 w-5 fill-[#ffffcc]"></BackIcon>
                  <span className="ml-2 text-lg font-semibold">
                    {curEatery.name}
                  </span>
                </button>
                <h1 className="mb-2 text-3xl font-semibold lg:text-5xl">
                  {curStall.name}
                </h1>
                <div className="flex flex-col text-base font-normal lg:flex-row lg:gap-4">
                  <span className="">Food Type: {curStall.foodType}</span>
                  <span className="">
                    Opening Hours: {curStall.openingHours}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <main ref={menuRef} className="h-4/6 w-full overflow-y-scroll">
        {!curMenu ? (
          <div className="flex h-full items-center justify-center">
            <LoadingIcon className="h-20 animate-spin fill-[#F9C03F]"></LoadingIcon>
          </div>
        ) : (
          <div>
            <Menu menu={curMenu}></Menu>
            {showScrollIndicator && (
              <div className="absolute bottom-0 mb-1 flex w-full justify-center">
                <ArrowDownIcon className="h-5 animate-bounce"></ArrowDownIcon>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default StallPopupContent;
