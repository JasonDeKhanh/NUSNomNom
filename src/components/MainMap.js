import React from "react";

import { MapContainer, TileLayer } from "react-leaflet";

function MainMap(props) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[35, -100]}
        zoom={3}
        maxBounds={[
          [120, 20],
          [-50, -200],
        ]}
        maxZoom={5}
      >
        <TileLayer
          noWrap={true}
          attribution=""
          url={"../maps/kentridgecampus/{z}/{x}/{y}.png"}
        />
      </MapContainer>
    </div>
  );
}

export default MainMap;
