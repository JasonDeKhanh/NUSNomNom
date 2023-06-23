import React from "react";
import StallListEl from "./StallListEl";

function StallsListSection(props) {
  const { stalls } = props;
  return (
    <div className="md:flex md:flex-wrap">
      {stalls &&
        stalls.map((stall) => (
          <StallListEl key={stall._id} stall={stall}></StallListEl>
        ))}
    </div>
  );
}

export default StallsListSection;
