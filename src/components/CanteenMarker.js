import React, { useEffect, useRef, useState } from "react";

import { Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { useCampusesContext } from "../hooks/useCampusesContext";
import PopupBox from "./PopupBox";
import CanteenPopupContent from "./CanteenPopupContent";
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
  }

  async function getCurCanteenDetails() {
    const apiString = "/api/canteens/" + canteen._id;
    const response = await fetch(apiString);
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_CUR_EATERY", payload: json });
    } else {
      dispatch({
        type: "SET_CUR_EATERY",
        payload: { stalls: [], error: json.error },
      });
    }
  }

  // Show or hide tooltip (marker label)
  const [refreshMarkerDummy, setRefreshMarkerDummy] = useState(0);
  useEffect(() => {
    setRefreshMarkerDummy(refreshMarkerDummy + 1);
  }, []); // need this useEffect so the show title when zomming in works
  const canteenMarkerRef = useRef(null);
  const desiredZoomLevelCanteen = 5;
  const canteenMarker = canteenMarkerRef.current;
  useEffect(() => {
    const updateTooltipVisibility = () => {
      if (canteenMarker && map) {
        const currentZoomLevel = map.getZoom();

        // Show the tooltip if the current zoom level is equal to or greater than the desired zoom level
        if (currentZoomLevel >= desiredZoomLevelCanteen) {
          canteenMarker.getTooltip().setOpacity(1);
        } else {
          canteenMarker.getTooltip().setOpacity(0);
        }
      }
    };

    if (canteenMarker && map) {
      canteenMarker.on("add", updateTooltipVisibility);
      map.on("zoomend", updateTooltipVisibility);
    }

    // Cleanup function
    return () => {
      if (canteenMarker && map) {
        canteenMarker.off("add", updateTooltipVisibility);
        map.off("zoomend", updateTooltipVisibility);
      }
    };
  }, [desiredZoomLevelCanteen, map, canteenMarker]);

  // to ignore hover markers on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as per your needs
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function onHoverMarker() {
    if (!isMobile) {
      canteenMarker?.getTooltip().setOpacity(1);
    }
  }

  function onStopHoverMarker() {
    if (!isMobile) {
      if (!(map.getZoom() >= desiredZoomLevelCanteen)) {
        canteenMarker?.getTooltip().setOpacity(0);
      }
    }
  }

  return (
    <div>
      {canteen && (
        <Marker
          position={[canteen.yCoord, canteen.xCoord]}
          icon={canteenIcon}
          eventHandlers={{
            click: openCanteenPopup,
            mouseover: onHoverMarker,
            mouseout: onStopHoverMarker,
          }}
          ref={canteenMarkerRef}
        >
          <Tooltip
            direction="center"
            offset={[0, -55]}
            className="bg-transparent stroke-[#FFFFCC] text-lg font-semibold text-[#EC5453] drop-shadow-glow"
            permanent
            opacity={0}
          >
            {canteen.name}
          </Tooltip>
          <PopupBox
            open={isOpenPopup}
            onClose={closeCanteenPopup}
            isMenuPage={true}
          >
            <div className={`flex flex-col flex-nowrap`}>
              <div
                className={`${
                  !curStall
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-20"
                } h-full transition-all duration-500 ease-in-out`}
              >
                <CanteenPopupContent
                  canteen={canteen}
                  open={isOpenPopup}
                ></CanteenPopupContent>
              </div>
              <div
                className={`${
                  curStall ? "opacity-100" : "pointer-events-none opacity-0"
                } absolute h-full w-full transition-all duration-500 ease-in-out`}
              >
                <StallPopupContent></StallPopupContent>
              </div>
            </div>
          </PopupBox>
          <div className="hidden">{refreshMarkerDummy}</div>
        </Marker>
      )}
    </div>
  );
}

export default CanteenMarker;
