import React from "react";

import { ReactComponent as RestaurantIcon } from "../icons/RestaurantIcon.svg";
import { ReactComponent as CanteenIcon } from "../icons/CanteenIcon.svg";

function InstructionsPage(props) {
  const { onClose } = props;

  return (
    <main onClick={onClose} className="h-full w-full">
      <div className="absolute flex h-full w-full flex-col items-center justify-evenly overflow-auto p-4 md:font-medium">
        <span className="mb-2 text-2xl font-bold">Instructions</span>
        <div className="flex w-full flex-col justify-center gap-4 md:flex-row lg:gap-2">
          <div className="flex justify-center md:mr-4 lg:w-1/3">
            <RestaurantIcon className="mr-4 h-auto w-10" />
            <span className="w-4/5 pt-1 md:w-3/5">
              <span className="font-medium text-[#2FA499]">Restaurants</span>{" "}
              are standalone outlets, each with its{" "}
              <span className="whitespace-nowrap">own menu.</span>
            </span>
          </div>
          <div className="flex justify-center lg:w-1/3">
            <CanteenIcon className="mr-4 h-auto w-10" />
            <span className="w-4/5 pt-1 md:w-3/5">
              <span className="font-medium text-[#EC5453]">Canteens</span> have
              many stalls, with each stall having its{" "}
              <span className="whitespace-nowrap">own menu!</span>
            </span>
          </div>
        </div>
        <hr className="my-2 w-11/12 border-[#f9c03f] md:w-3/5" />
        <div className="md:flex md:justify-center">
          <div className="mb-2 flex flex-col items-center md:w-1/2 xl:w-2/5">
            <span className="mb-2 text-center">
              1. Select your preferred campus
            </span>
            <img
              className="h-auto w-4/5 rounded-lg border border-[#f9c03f] md:mt-6"
              src={`${process.env.PUBLIC_URL}/images/SelectCampus.webp`}
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
              src={`${process.env.PUBLIC_URL}/images/ClickOnMarker.webp`}
              alt="Select campus from dropdown at top of the screen"
            />
          </div>
        </div>
      </div>
      <span className="absolute bottom-1 w-full text-center text-sm font-light italic">
        Click anywhere to close this window
      </span>
    </main>
  );
}

export default InstructionsPage;
