import React from "react";
import StallListEl from "./StallListEl";

function StallsListSection(props) {
  const { stalls } = props;
  return (
    <div className="md:flex md:flex-wrap">
      {stalls &&
        stalls.map((stall) => <StallListEl stall={stall}></StallListEl>)}
    </div>
  );
}

export default StallsListSection;
