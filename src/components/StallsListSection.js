import React from "react";
import StallListEl from "./StallListEl";

function StallsListSection(props) {
  const { stalls } = props;
  return (
    <div>
      {stalls &&
        stalls.map((stall) => (
          <div key={stall._id}>
            <StallListEl stall={stall}></StallListEl>
          </div>
        ))}
    </div>
  );
}

export default StallsListSection;
