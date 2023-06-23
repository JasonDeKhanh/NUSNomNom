import React from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";
import StallsListSection from "./StallsListSection";

function CanteenPopupContent(props) {
  const { open } = props;
  const { curEatery } = useCampusesContext();

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
            <div className="h-full bg-black bg-black/70 p-10 text-[#ffffcc] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
              {curEatery && (
                <div className="flex h-full items-center justify-center md:justify-start">
                  <div>
                    <h1 className="mb-2 text-3xl font-semibold lg:text-5xl">
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
          <main className="h-3/5 w-full overflow-y-scroll">
            <StallsListSection stalls={curEatery?.stalls}></StallsListSection>
          </main>
        </div>
      )}
    </div>
  );
}

export default CanteenPopupContent;
