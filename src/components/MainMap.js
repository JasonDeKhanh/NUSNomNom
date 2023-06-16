import React, { useEffect, useState } from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { useCampusesContext } from "../hooks/useCampusesContext";

function MainMap(props) {
  const { curCampus, dispatch } = useCampusesContext();
  const campusFolderPath =
    "../maps/" + curCampus?.mapFolderName + "/{z}/{x}/{y}.png";

  // fetch eateries
  const [curEateries, setCurEateries] = useState([]);
  useEffect(() => {
    const fetchEateries = async () => {
      const eateriesApiString = "/api/campuses/eateries/" + curCampus?._id;
      const response = await fetch(eateriesApiString); // PRODUCTION: must put full links
      const json = await response.json();

      // check if response is okay and without error
      if (response.ok) {
        setCurEateries(json);
      }
    };

    fetchEateries();
  }, [curCampus]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[35, -100]}
        zoom={3}
        maxBounds={[
          [120, 20],
          [-50, -200],
        ]}
        minZoom={1}
        maxZoom={5}
      >
        <TileLayer noWrap={true} attribution="" url={campusFolderPath} />
        {curEateries.map((eatery) => (
          <Marker position={[eatery.yCoord, eatery.xCoord]}></Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MainMap;
