import React, { useEffect, useRef, useState } from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";
import Menu from "./Menu";

import { ReactComponent as ArrowDownIcon } from "../icons/ArrowDown.svg";
import { ReactComponent as LoadingIcon } from "../icons/LoadingSpinner.svg";

function RestaurantPopupContent(props) {
  const { open, curMenu } = props;
  const { curEatery } = useCampusesContext();

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
      // cleanup function
      isComponentMounted.current = false;
      if (!menuRef.current) return; // Add null check
      menuRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-full">
      {open && (
        <div className="h-full">
          <header
            className="h-2/6 w-full bg-cover bg-center text-center md:text-left landscape:md:max-lg:h-2/5"
            style={{ backgroundImage: `url(${curEatery?.bgImageUrl})` }}
          >
            <div className="h-full bg-black bg-black/70 p-10 text-[#ffffcc] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
              {curEatery && (
                <div className="flex h-full items-center justify-center md:justify-start">
                  <div>
                    <h1 className="mb-2 text-3xl font-semibold lg:text-5xl">
                      {curEatery.name}
                    </h1>
                    <div className="flex flex-col text-sm font-normal landscape:md:max-lg:text-xs">
                      <span>
                        <span className="font-semibold">Food type: </span>
                        {curEatery.foodType}
                      </span>
                      <span>
                        <span className="font-semibold">Opening hours:</span>{" "}
                        {curEatery.openingHours}
                      </span>
                      <span>
                        <span className="font-semibold">Near: </span>
                        {curEatery.placesNear.map((place, index) => (
                          <span key={index}>{(index ? ", " : "") + place}</span>
                        ))}
                      </span>
                      <span>
                        <span className="font-semibold">Bus stops: </span>
                        {curEatery.busStopsNear.map((busStop, index) => (
                          <span key={index}>
                            {(index ? ", " : "") + busStop}
                          </span>
                        ))}
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
            {!curMenu ? (
              <div className="flex h-full items-center justify-center">
                <LoadingIcon className="h-20 animate-spin fill-[#F9C03F]"></LoadingIcon>
              </div>
            ) : !curMenu.error ? (
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
          </main>
        </div>
      )}
    </div>
  );
}

export default RestaurantPopupContent;
