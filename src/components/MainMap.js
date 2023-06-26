import React, { useEffect, useState } from "react";

import { AttributionControl, MapContainer, TileLayer } from "react-leaflet";

import { useCampusesContext } from "../hooks/useCampusesContext";
import CanteenMarker from "./CanteenMarker";
import RestaurantMarker from "./RestaurantMarker";
import SideMenu from "./SideMenu";
import HeaderBar from "./HeaderBar";

function MainMap(props) {
  const { curCampus } = useCampusesContext();

  const campusFolderPath =
    "../maps/" + curCampus?.mapFolderName + "/{z}/{x}/{y}.png";

  // fetch eateries
  const [curCanteens, setCurCanteens] = useState([]);
  const [curRestaurants, setCurRestaurants] = useState([]);
  useEffect(() => {
    const fetchEateries = async () => {
      const eateriesApiString = "/api/campuses/eateries/" + curCampus?._id;
      const response = await fetch(eateriesApiString); // PRODUCTION: must put full links
      const json = await response.json();

      // check if response is okay and without error
      if (response.ok) {
        // setCurEateries(json);
        setCurCanteens(json.canteens);
        setCurRestaurants(json.restaurants);
      }
    };

    fetchEateries();
  }, [curCampus]);

  return (
    <div>
      <div className="top-0 z-[-1] h-full w-full">
        <MapContainer
          center={[35, -100]}
          zoom={3}
          maxBounds={[
            [120, 20],
            [-50, -200],
          ]}
          minZoom={1}
          maxZoom={5}
          attributionControl={false}
        >
          <TileLayer noWrap={true} attribution="" url={campusFolderPath} />
          {curCanteens.map((canteen) => (
            <CanteenMarker key={canteen._id} canteen={canteen}></CanteenMarker>
          ))}
          {curRestaurants.map((restaurant) => (
            <RestaurantMarker
              key={restaurant._id}
              restaurant={restaurant}
            ></RestaurantMarker>
          ))}
          <AttributionControl position="bottomleft" />
        </MapContainer>
      </div>
    </div>
  );
}

export default MainMap;
