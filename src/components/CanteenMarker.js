import React, { useState } from "react";

import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import CanteenPopupContent from "./CanteenPopupContent";
import PopupBox from "./PopupBox";
import { useCampusesContext } from "../hooks/useCampusesContext";
import StallPopupContent from "./StallPopupContent";

const canteenIcon = new L.icon({
  iconUrl: "../icons/CanteenIcon.svg",
  iconSize: [31, 40],
  iconAnchor: [15, 40],
});

function CanteenMarker(props) {
  const { canteen } = props;
  const { curStall, dispatch } = useCampusesContext();

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const map = useMap();
  function setBackgroundZoom(zoomBoolean) {
    if (zoomBoolean !== map.options.scrollWheelZoom) {
      map.options.scrollWheelZoom = zoomBoolean;
      map.options.doubleClickZoom = zoomBoolean;
      map.options.dragging = zoomBoolean;
      if (zoomBoolean) {
        map.scrollWheelZoom.enable();
        map.doubleClickZoom.enable();
        map.dragging.enable();
      } else {
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
        map.dragging.disable();
      }
    }
  }

  function openCanteenPopup() {
    setIsOpenPopup(true);
    getCurCanteenDetails();
    setBackgroundZoom(false);
    document.body.style.overflow = "hidden";
  }

  function closeCanteenPopup() {
    setIsOpenPopup(false);
    dispatch({ type: "REMOVE_CUR_EATERY", payload: null });
    setBackgroundZoom(true);
    document.body.style.overflow = "auto";
  }

  async function getCurCanteenDetails() {
    const apiString = "/api/canteens/" + canteen._id;
    const response = await fetch(apiString);
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_CUR_EATERY", payload: json });
    }
  }

  return (
    <div>
      {canteen && (
        <Marker
          position={[canteen.yCoord, canteen.xCoord]}
          icon={canteenIcon}
          eventHandlers={{ click: openCanteenPopup }}
        >
          <PopupBox open={isOpenPopup} onClose={closeCanteenPopup}>
            {!curStall ? (
              <CanteenPopupContent
                canteen={canteen}
                open={isOpenPopup}
              ></CanteenPopupContent>
            ) : (
              <StallPopupContent></StallPopupContent>
            )}
          </PopupBox>
        </Marker>
      )}
    </div>
  );
}

export default CanteenMarker;
