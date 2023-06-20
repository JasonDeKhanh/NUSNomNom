import React from "react";

import { Marker } from "react-leaflet";
import L from "leaflet";

const restaurantIcon = new L.icon({
  iconUrl: "../icons/RestaurantIcon.svg",
  iconSize: [31, 40],
  iconAnchor: [15, 40],
});

function RestaurantMarker(props) {
  const { restaurant } = props;
  return (
    <div>
      {restaurant && (
        <Marker
          position={[restaurant.yCoord, restaurant.xCoord]}
          icon={restaurantIcon}
        ></Marker>
      )}
    </div>
  );
}

export default RestaurantMarker;
