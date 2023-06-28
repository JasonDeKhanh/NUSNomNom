import React from "react";

import { ReactComponent as RestaurantIcon } from "../icons/RestaurantIcon.svg";
import { ReactComponent as CanteenIcon } from "../icons/CanteenIcon.svg";

function InstructionsPage(props) {
  return (
    <main className="absolute flex h-full w-full flex-col items-center justify-center overflow-auto p-4 md:font-medium">
      <h2 className="mb-2 text-2xl font-bold">Instructions</h2>
      <div className="flex w-full flex-col justify-center gap-4 md:flex-row lg:gap-2">
        <div className="flex justify-center md:mr-4 lg:w-1/3">
          <RestaurantIcon className="mr-4 h-auto w-10" />
          <span className="w-4/5 pt-1 md:w-3/5">
            Restaurants are standalone outlets, each with its{" "}
            <span className="whitespace-nowrap">own menu.</span>
          </span>
        </div>
        <div className="flex justify-center lg:w-1/3">
          <CanteenIcon className="mr-4 h-auto w-10" />
          <span className="w-4/5 pt-1 md:w-3/5">
            Canteens have many stalls, with each stall having its{" "}
            <span className="whitespace-nowrap">own menu!</span>
          </span>
        </div>
      </div>
      <hr className="my-2 w-11/12 border-[#f9c03f] md:w-3/5" />
      <div className="md:flex md:justify-center">
        <div className="mb-4 flex flex-col items-center md:w-1/2 xl:w-2/5">
          <span>1. Select your preferred campus</span>
          <img
            className="h-auto w-4/5 rounded-lg border border-[#f9c03f] md:mt-8"
            src="../images/SelectCampus.webp"
            alt="Select campus from dropdown at top of the screen"
          />
        </div>
        <div className="mb-4 flex flex-col items-center md:w-1/2 xl:w-2/5">
          <span className="mb-2 text-center">
            2. Find and{" "}
            <span className="font-bold text-[#d3a335]">click/tap</span> on
            markers of different canteens/restaurants to see{" "}
            <span className="whitespace-nowrap">their menus!</span>
          </span>
          <img
            className="h-auto w-4/5 rounded-lg border border-[#f9c03f] "
            src="../images/ClickOnMarker.webp"
            alt="Select campus from dropdown at top of the screen"
          />
        </div>
      </div>
      {/* <span className="font-light italic">
        &#40;graphic designers please help&#41;
      </span> */}
    </main>
  );
}

export default InstructionsPage;
