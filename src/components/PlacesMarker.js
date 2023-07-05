import React, { useEffect, useRef } from "react";

import { Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";

var invisIcon = new L.Icon({
  iconUrl: "lol",
  iconRetinaUrl: "what",
  iconSize: [0.0, 0.0],
  iconAnchor: [0, 0],
  // popupAnchor: [1, -34],
  shadowSize: [0, 0],
});

function PlacesMarker(props) {
  const { place } = props;

  const map = useMap();
  // Show or hide tooltip (marker label)
  const markerRef = useRef(null);
  const desiredZoomLevelCanteen = 3;
  const marker = markerRef.current;
  useEffect(() => {
    const updateTooltipVisibility = () => {
      if (marker && map) {
        const currentZoomLevel = map.getZoom();

        // Show the tooltip if the current zoom level is equal to or greater than the desired zoom level
        if (currentZoomLevel >= desiredZoomLevelCanteen) {
          marker.getTooltip().setOpacity(1);
        } else {
          marker.getTooltip().setOpacity(0);
        }
      }
    };

    if (marker && map) {
      marker.on("add", updateTooltipVisibility);
      map.on("zoomend", updateTooltipVisibility);
    }

    // Cleanup function
    return () => {
      if (marker && map) {
        marker.off("add", updateTooltipVisibility);
        map.off("zoomend", updateTooltipVisibility);
      }
    };
  }, [desiredZoomLevelCanteen, map, marker]);

  return (
    <div>
      {place && (
        <Marker
          position={[place.yCoord, place.xCoord]}
          icon={invisIcon}
          opacity={0}
          className="pointer-events-none"
          ref={markerRef}
        >
          <Tooltip
            direction="center"
            offset={[0, -20]}
            className="pointer-events-none w-[5.5rem] whitespace-normal bg-transparent stroke-[#FFFFCC] stroke-black text-center text-xs font-medium text-black drop-shadow-placeGlow transition duration-100 md:text-sm"
            permanent
          >
            {place.placeName}
          </Tooltip>
        </Marker>
      )}
    </div>
  );
}

export default PlacesMarker;
