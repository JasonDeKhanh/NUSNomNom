import React from "react";
import StallListEl from "./StallListEl";

function StallsListSection(props) {
  const { stalls } = props;
  return (
    <div
      className={`${
        stalls.length !== 0 ? "visible opacity-100" : "invisible opacity-0"
      } transition-all delay-200 duration-200`}
    >
      <div className="md:flex md:flex-wrap">
        {stalls.map((stall) => (
          <StallListEl key={stall._id} stall={stall}></StallListEl>
        ))}
      </div>
    </div>
  );
}

export default StallsListSection;
