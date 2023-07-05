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
      if (curStall) {
        const apiString = "/api/stalls/getmenu/" + curStall._id;
        const response = await fetch(apiString);
        const json = await response.json();

        if (response.ok) {
          setCurMenu(json);
        } else {
          setCurMenu({ error: json.error });
        }
      }
    };

    fetchStallMenu();
  }, [curStall]);

  function handleBackButton() {
    setCurMenu(null);
    dispatch({ type: "REMOVE_CUR_STALL", payload: null });
  }

  return (
    <div className="h-full">
      <header
        className="h-2/6 w-full bg-cover bg-center md:text-left landscape:md:max-lg:h-2/5"
        style={{ backgroundImage: `url(${curStall?.stallImageUrl})` }}
      >
        <div className="h-full bg-black bg-black/70 p-10 text-[#ffffcc] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
          {curStall && (
            <div className="flex h-full justify-center md:justify-start">
              <div className="flex flex-col justify-center text-center md:text-left">
                <button
                  onClick={handleBackButton}
                  className="mb-4 flex w-fit items-center justify-center rounded-lg border border-[#ffffcc] px-2 landscape:md:max-lg:mb-2"
                >
                  <BackIcon className="h-5 w-5 fill-[#ffffcc] landscape:md:max-lg:h-4"></BackIcon>
                  <span className="ml-2 text-lg font-semibold landscape:md:max-lg:text-sm">
                    {curEatery.name}
                  </span>
                </button>
                <h1 className="mb-2 text-3xl font-semibold lg:text-5xl landscape:md:max-lg:text-xl">
                  {curStall.name}
                </h1>
                <div className="flex flex-col text-base font-normal lg:flex-row lg:gap-4 landscape:md:max-lg:text-xs">
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
      <main
        ref={menuRef}
        className="h-4/6 w-full overflow-y-scroll landscape:md:max-lg:h-3/5"
      >
        <div
          className={`${
            !curMenu
              ? "bg-white opacity-100"
              : "pointer-events-none bg-transparent opacity-0"
          } absolute flex h-4/6 w-full items-center justify-center transition-all delay-100 duration-300 ease-in`}
        >
          <LoadingIcon className="h-20 animate-spin fill-[#F9C03F]"></LoadingIcon>
        </div>
        {curMenu && (
          <div>
            {!curMenu.error ? (
              <div>
                <Menu menu={curMenu}></Menu>
                {showScrollIndicator && (
                  <div className="absolute bottom-0 mb-1 flex w-full justify-center">
                    <ArrowDownIcon className="h-5 animate-bounce drop-shadow-glow"></ArrowDownIcon>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex w-full justify-center p-4 text-lg">
                An error has occurred:&nbsp;
                <span className="text-red-500">{curMenu.error}</span>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default StallPopupContent;
