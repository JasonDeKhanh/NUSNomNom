import React from "react";
import { useCampusesContext } from "../hooks/useCampusesContext";
import Menu from "./Menu";

function RestaurantPopupContent(props) {
  const { open, curMenu } = props;
  const { curEatery } = useCampusesContext();

  return (
    <div className="h-full">
      {open && (
        <div className="h-full">
          <header
            className="h-2/6 w-full bg-cover bg-center text-center md:text-left"
            style={{ backgroundImage: `url(${curEatery?.bgImageUrl})` }}
          >
            <div className="h-full bg-black bg-black/70 p-10 text-[#ffffcc] md:bg-transparent md:bg-gradient-to-r md:from-black md:from-20% md:opacity-100">
              {curEatery && (
                <div className="flex h-full items-center justify-center md:justify-start">
                  <div>
                    <h1 className="mb-2 text-3xl font-semibold lg:text-5xl">
                      {curEatery.name}
                    </h1>
                    <div className="flex flex-col text-sm font-normal">
                      <span>Food type: {curEatery.foodType}</span>
                      <span>Opening hours: {curEatery.openingHours}</span>
                      <span>
                        Near:{" "}
                        {curEatery.placesNear.map((place, index) => (
                          <span key={index}>{(index ? ", " : "") + place}</span>
                        ))}
                      </span>
                      <span>
                        Bus stops:{" "}
                        {curEatery.busStopsNear.map((busStop, index) => (
                          <span key={index}>
                            {(index ? ", " : "") + busStop}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>
          <main className="h-4/6 w-full overflow-y-scroll">
            <Menu menu={curMenu}></Menu>
          </main>
        </div>
      )}
    </div>
  );
}

export default RestaurantPopupContent;
