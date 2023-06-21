import React from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";

function StallPopupContent(props) {
  const { curStall, dispatch } = useCampusesContext();

  // fetch menu!

  function handleBackButton() {
    dispatch({ type: "REMOVE_CUR_STALL", payload: null });
  }

  return (
    <div>
      <button onClick={handleBackButton}>Back to Canteen Details</button>
      <div>{curStall.name}</div>
    </div>
  );
}

export default StallPopupContent;
