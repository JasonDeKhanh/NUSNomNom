import React, { useEffect, useRef, useState } from "react";

import { Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { useCampusesContext } from "../hooks/useCampusesContext";
import PopupBox from "./PopupBox";
import RestaurantPopupContent from "./RestaurantPopupContent";

const restaurantIcon = new L.icon({
  iconUrl: "../icons/RestaurantIcon.svg",
  iconSize: [31, 40],
  iconAnchor: [15, 40],
});

function RestaurantMarker(props) {
  const { restaurant } = props;
  const { dispatch } = useCampusesContext();

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

  function openRestaurantPopup() {
    setIsOpenPopup(true);
    setCurRestaurant();
    setBackgroundZoom(false);
    document.body.style.overflow = "hidden";
  }

  function closeRestaurantPopup() {
    setIsOpenPopup(false);
    dispatch({ type: "REMOVE_CUR_EATERY", payload: null });
    setBackgroundZoom(true);
  }

  function setCurRestaurant() {
    dispatch({ type: "SET_CUR_EATERY", payload: restaurant });
  }

  const apiRoot = "https://nusnomnom-backend.onrender.com";
  // fetch menu from out here!
  const [curMenu, setCurMenu] = useState(null);
  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      const apiString = apiRoot + "/api/restaurants/getmenu/" + restaurant._id;
      const response = await fetch(apiString);
      const json = await response.json();

      if (response.ok) {
        setCurMenu(json);
      } else {
        setCurMenu({ error: json.error });
      }
    };

    fetchRestaurantMenu();
  }, []);

  // Show or hide tooltip (marker label)
  const restaurantMarkerRef = useRef(null);
  const desiredZoomLevelRestaurant = 5;
  const marker = restaurantMarkerRef.current;
  useEffect(() => {
    const updateTooltipVisibility = () => {
      if (marker && map) {
        const currentZoomLevel = map.getZoom();

        // Show the tooltip if the current zoom level is equal to or greater than the desired zoom level
        if (currentZoomLevel >= desiredZoomLevelRestaurant) {
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
  }, [desiredZoomLevelRestaurant, map, marker]);

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
      marker?.getTooltip().setOpacity(1);
    }
  }

  function onStopHoverMarker() {
    if (!isMobile) {
      if (!(map.getZoom() >= desiredZoomLevelRestaurant)) {
        marker?.getTooltip().setOpacity(0);
      }
    }
  }

  return (
    <div className="">
      {restaurant && (
        <Marker
          position={[restaurant.yCoord, restaurant.xCoord]}
          icon={restaurantIcon}
          eventHandlers={{
            click: openRestaurantPopup,
            mouseover: onHoverMarker,
            mouseout: onStopHoverMarker,
          }}
          ref={restaurantMarkerRef}
        >
          <Tooltip
            direction="center"
            offset={[0, -55]}
            className="bg-transparent stroke-[#FFFFCC] text-lg font-semibold text-[#2FA499] drop-shadow-glow transition duration-100"
            permanent
            opacity={0}
          >
            {restaurant.name}
          </Tooltip>
          <PopupBox
            open={isOpenPopup}
            onClose={closeRestaurantPopup}
            isMenuPage={true}
          >
            <RestaurantPopupContent
              curMenu={curMenu}
              open={isOpenPopup}
            ></RestaurantPopupContent>
          </PopupBox>
        </Marker>
      )}
    </div>
  );
}

export default RestaurantMarker;
