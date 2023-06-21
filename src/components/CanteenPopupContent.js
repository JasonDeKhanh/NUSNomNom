import React, { useEffect } from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";
import StallListEl from "./StallListEl";
import StallsListSection from "./StallsListSection";

function CanteenPopupContent(props) {
  const { open, onClose, canteen } = props;
  const { curEatery, dispatch } = useCampusesContext();

  // Fetch canteen details and stalls list
  // useEffect(() => {
  //   const fetchCanteenDetails = async () => {
  //     const apiString = "/api/canteens/" + canteen._id;
  //     const response = await fetch(apiString);
  //     const json = await response.json();

  //     if (response.ok) {
  //       dispatch({ type: "SET_CUR_EATERY", payload: json });
  //     }
  //   };

  //   fetchCanteenDetails();
  // }, []);

  return (
    <div className="h-full">
      {open && (
        <div className="h-full">
          <header
            className="h-2/5 w-full bg-cover bg-center text-center md:text-left"
            style={{ backgroundImage: `url(${curEatery?.bgImageUrl})` }}
          >
            <div className="h-full bg-black bg-black/70 p-10 text-[#FFFFE7] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
              {curEatery && (
                <div className="flex h-full items-center">
                  <div>
                    <h1 className="mb-2 text-5xl font-semibold lg:text-7xl">
                      {curEatery.name}
                    </h1>
                    <div className="flex flex-col text-base font-medium">
                      <span>Opening hours: {curEatery.openingHours}</span>
                      <span>
                        Near:{" "}
                        {curEatery.placesNear.map((place, index) => (
                          <span key={index}>{(index ? ", " : "") + place}</span>
                        ))}
                      </span>
                      <span>
                        Bus stops:{" "}
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
          {curEatery && (
            <StallsListSection stalls={curEatery.stalls}></StallsListSection>
          )}
        </div>
      )}
    </div>
  );
}

export default CanteenPopupContent;
