import React, { useEffect, useRef, useState } from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";
import StallsListSection from "./StallsListSection";

import { ReactComponent as ArrowDownIcon } from "../icons/ArrowDown.svg";
import { ReactComponent as LoadingIcon } from "../icons/LoadingSpinner.svg";

function CanteenPopupContent(props) {
  const { open, canteen } = props;
  const { curEatery, curStall } = useCampusesContext();

  // Handle scroll indicator
  const stallsRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const isComponentMounted = useRef(true); // prevent bug where popup is closed too quickly after scrolling

  const handleScroll = () => {
    if (!isComponentMounted.current) return;

    // scrollHeight and clientHeight and scrollTop are all HTML properties of DOM elements, already given
    const { scrollTop, scrollHeight, clientHeight } = stallsRef.current;
    const isScrollable = scrollHeight > clientHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // Add a small buffer to determine the bottom

    setShowScrollIndicator(isScrollable && !isAtBottom);
  };

  useEffect(() => {
    if (!stallsRef.current) return; // Add null check

    const stallsElement = stallsRef.current;

    if (stallsElement.scrollHeight > stallsElement.clientHeight) {
      setShowScrollIndicator(true);
    }

    stallsRef.current.addEventListener("scroll", handleScroll);
    return () => {
      isComponentMounted.current = false;
      if (!stallsRef.current) return; // Add null check
      stallsRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-full">
      {open && (
        <div className="h-full">
          <header
            className="h-2/5 w-full bg-cover bg-center text-center md:text-left"
            style={{ backgroundImage: `url(${canteen?.bgImageUrl})` }}
          >
            <div className="h-full bg-black bg-black/70 p-10 text-[#ffffcc] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
              {canteen && (
                <div className="flex h-full items-center justify-center md:justify-start">
                  <div>
                    <h1 className="mb-2 text-3xl font-semibold lg:text-5xl landscape:md:max-lg:text-xl">
                      {canteen.name}
                    </h1>
                    <div className="flex flex-col text-base font-normal landscape:md:max-lg:text-xs">
                      <span>Opening hours: {canteen.openingHours}</span>
                      <span>
                        Near:{" "}
                        {canteen.placesNear.map((place, index) => (
                          <span key={index}>{(index ? ", " : "") + place}</span>
                        ))}
                      </span>
                      <span>
                        Bus stops:{" "}
                        {canteen.busStopsNear.map((busStop, index) => (
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
          <main ref={stallsRef} className="h-3/5 w-full overflow-y-scroll">
            <div
              className={`${
                !curEatery
                  ? "bg-slate-50 opacity-100"
                  : "pointer-events-none bg-transparent opacity-0"
              } absolute flex h-full w-full items-center justify-center transition-all delay-100 duration-300 ease-in`}
            >
              <LoadingIcon className="h-20 animate-spin fill-[#F9C03F]"></LoadingIcon>
            </div>
            {curEatery && (
              <div className="h-full">
                {curEatery?.stalls.length !== 0 ? (
                  <div className="h-full">
                    <StallsListSection
                      stalls={curEatery?.stalls}
                    ></StallsListSection>

                    <div
                      className={`${
                        showScrollIndicator ? "opacity-100" : "opacity-0"
                      } absolute bottom-0 mb-1 flex w-full justify-center transition duration-150 ease-in`}
                    >
                      <ArrowDownIcon className="h-5 animate-bounce drop-shadow-glow"></ArrowDownIcon>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex w-full justify-center p-4 text-lg">
                      No stalls found or an error has occurred:&nbsp;
                      <span className="text-red-500">{curEatery?.error}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default CanteenPopupContent;
