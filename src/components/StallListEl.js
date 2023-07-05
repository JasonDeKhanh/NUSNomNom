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
      className="mx-4 my-4 h-40 cursor-pointer overflow-hidden rounded-2xl bg-[#ffffcc] transition-all duration-100 ease-in hover:scale-[1.01] hover:bg-[#CCCC98] 
      md:mx-2 md:min-w-min md:max-w-full md:shrink-0 md:grow md:basis-1/3 xl:basis-1/4"
    >
      <div className="mx-2 flex h-full">
        {/* Image ratio is 4x3 */}
        <img
          src={stall.stallImageUrl}
          alt=""
          className="h-36 w-48 self-center rounded-lg object-cover"
        />
        <div className="ml-2 flex scroll-my-4 flex-col p-2">
          <span className="text-lg font-bold lg:text-xl">{stall.name}</span>
          <span className="text-base font-medium italic lg:font-semibold">
            {stall.foodType}
          </span>
          <span className="mt-1 text-sm font-medium lg:text-base lg:font-semibold">
            Opening Hours:
            <br />
            {stall.openingHours}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StallListEl;
