import React, { useEffect, useState } from "react";

import { Marker, useMap } from "react-leaflet";
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
    document.body.style.overflow = "auto";
  }

  // async function getCurRestaurantDetails() {
  //   const apiString = "/api/restaurants/" + restaurant._id;
  //   const response = await fetch(apiString);
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: "SET_CUR_EATERY", payload: json });
  //   }
  // }

  function setCurRestaurant() {
    dispatch({ type: "SET_CUR_EATERY", payload: restaurant });
  }

  // fetch menu from out here!
  const [curMenu, setCurMenu] = useState(null);
  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      const apiString = "/api/restaurants/getmenu/" + restaurant._id;
      const response = await fetch(apiString);
      const json = await response.json();

      if (response.ok) {
        setCurMenu(json);
      }
    };

    fetchRestaurantMenu();
  }, []);

  return (
    <div>
      {restaurant && (
        <Marker
          position={[restaurant.yCoord, restaurant.xCoord]}
          icon={restaurantIcon}
          eventHandlers={{ click: openRestaurantPopup }}
        >
          <PopupBox open={isOpenPopup} onClose={closeRestaurantPopup}>
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
