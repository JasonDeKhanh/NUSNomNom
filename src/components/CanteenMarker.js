import React from "react";

import { Marker } from "react-leaflet";
import L from "leaflet";

const canteenIcon = new L.icon({
  iconUrl: "../icons/CanteenIcon.svg",
  iconSize: [31, 40],
  iconAnchor: [15, 40],
});

function CanteenMarker(props) {
  const { canteen } = props;
  return (
    <div>
      {canteen && (
        <Marker
          position={[canteen.yCoord, canteen.xCoord]}
          icon={canteenIcon}
        ></Marker>
      )}
    </div>
  );
}

export default CanteenMarker;
