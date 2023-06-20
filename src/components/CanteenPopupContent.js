import React, { useEffect } from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";
import StallListEl from "./StallListEl";

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
    <div>
      {open && curEatery && (
        <div className="flex flex-col">
          <button onClick={onClose}>CLOSE</button>
          CanteenPopup
          <div>{curEatery.name}</div>
          {curEatery.stalls.map((stall) => (
            <div key={stall._id}>
              <StallListEl stall={stall}></StallListEl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CanteenPopupContent;
