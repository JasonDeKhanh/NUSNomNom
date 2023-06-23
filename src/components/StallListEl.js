import React from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";

function StallListEl(props) {
  const { stall } = props;
  const { dispatch } = useCampusesContext();

  function handleOnClickStall() {
    dispatch({ type: "SET_CUR_STALL", payload: stall });
  }

  return (
    <div
      onClick={handleOnClickStall}
      className="mx-2 my-4 h-20 w-full overflow-scroll bg-[#FFFFE7]"
    >
      <div className="flex">
        <span>{stall.name}</span>
        <span>{stall.foodType}</span>
      </div>
    </div>
  );
}

export default StallListEl;
