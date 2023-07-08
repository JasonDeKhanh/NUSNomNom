import React, { useEffect, useState } from "react";

import { AttributionControl, MapContainer, TileLayer } from "react-leaflet";

import { useCampusesContext } from "../hooks/useCampusesContext";
import CanteenMarker from "./CanteenMarker";
import RestaurantMarker from "./RestaurantMarker";
import PlacesMarker from "./PlacesMarker";

function MainMap(props) {
  const { curCampus } = useCampusesContext();

  const campusFolderPath =
    process.env.PUBLIC_URL +
    "/maps/" +
    curCampus?.mapFolderName +
    "/{z}/{x}/{y}.png";

  const apiRoot = "https://nusnomnom-backend.onrender.com";

  function isIOS() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  function isStandalone() {
    return isIOS() && window.navigator.standalone;
  }

  // fetch eateries
  const [curCanteens, setCurCanteens] = useState([]);
  const [curRestaurants, setCurRestaurants] = useState([]);
  useEffect(() => {
    const fetchEateries = async () => {
      const eateriesApiString =
        apiRoot + "/api/campuses/eateries/" + curCampus?._id;
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

  // Places
  const [curPlaces, setCurPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      const placesApiString =
        apiRoot + "/api/campuses/places/" + curCampus?._id;
      const response = await fetch(placesApiString); // PRODUCTION: must put full links
      const json = await response.json();

      // check if response is okay and without error
      if (response.ok) {
        // setCurEateries(json);
        setCurPlaces(json);
      }
    };

    fetchPlaces();
  }, [curCampus]);

  return (
    <div>
      {curCampus && (
        <div className="top-0 z-[-1] h-full w-full">
          <MapContainer
            center={[curCampus.mapCenterY, curCampus.mapCenterX]}
            zoom={3}
            maxBounds={[
              [120, 20],
              [-50, -200],
            ]}
            minZoom={1}
            maxZoom={5}
            attributionControl={false}
            style={{
              // is either iOS + standalone (homescreen) or not iOS
              height: isStandalone() || !isIOS() ? "100vh" : "100svh",
            }}
          >
            <TileLayer noWrap={true} attribution="" url={campusFolderPath} />
            {curPlaces.map((place) => (
              <PlacesMarker key={place._id} place={place}></PlacesMarker>
            ))}
            {curCanteens.map((canteen) => (
              <CanteenMarker
                key={canteen._id}
                canteen={canteen}
              ></CanteenMarker>
            ))}
            {curRestaurants.map((restaurant) => (
              <RestaurantMarker
                key={restaurant._id}
                restaurant={restaurant}
              ></RestaurantMarker>
            ))}
            <AttributionControl position="bottomleft" />
          </MapContainer>
          <div className="absolute bottom-2 mx-14 text-center text-xs italic md:text-base md:font-normal">
            Information may not be 100% accurate{" "}
            <span className="whitespace-nowrap">or up-to-date!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMap;
