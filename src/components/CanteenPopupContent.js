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
      {open && curEatery && (
        <div className="flex h-full flex-col">
          <header
            className="h-2/5 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${curEatery.bgImageUrl})` }}
          >
            <div className="h-full bg-gradient-to-r from-black from-20% text-xl text-[#FFFFE7]">
              <button onClick={onClose}>CLOSE</button>
              <h1>{curEatery.name}</h1>
              <div className="flex flex-col">
                <span>Opening hours: {curEatery.openingHours}</span>
                <span>Near: {curEatery.placesNear}</span>
                <span>Bus stops: {curEatery.busStopsNear}</span>
              </div>
            </div>
          </header>
          <StallsListSection stalls={curEatery.stalls}></StallsListSection>
        </div>
      )}
    </div>
  );
}

export default CanteenPopupContent;
