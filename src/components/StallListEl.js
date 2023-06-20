import React from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";

function StallListEl(props) {
  const { stall } = props;
  const { dispatch } = useCampusesContext();

  function handleOnClickStall() {
    dispatch({ type: "SET_CUR_STALL", payload: stall });
  }

  return <div onClick={handleOnClickStall}>{stall.name}</div>;
}

export default StallListEl;
