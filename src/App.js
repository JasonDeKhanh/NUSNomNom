import { useEffect, useState } from "react";
import MainMap from "./components/MainMap";
import { useCampusesContext } from "./hooks/useCampusesContext";

import SideMenu from "./components/SideMenu";
import HeaderBar from "./components/HeaderBar";

function App() {
  const { dispatch } = useCampusesContext();
  // fetch campuses, set kentridge campuses as initial one
  const apiRoot = "https://nusnomnom-backend.onrender.com";
  useEffect(() => {
    const fetchAllCampuses = async () => {
      const apiString = apiRoot + "/api/campuses/";
      const response = await fetch(apiString);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CAMPUSES", payload: json });
      }
    };

    fetchAllCampuses();
  }, []);

  // prevent scrolling in ios standalone mode
  document.body.addEventListener(
    "touchmove",
    function (event) {
      event.preventDefault();
    },
    { passive: false }
  );

  // Side Menu
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  return (
    <div className="App">
      <div className="absolute top-0 flex">
        <SideMenu
          open={isOpenSideMenu}
          onClose={() => setIsOpenSideMenu(false)}
        ></SideMenu>
        <HeaderBar
          isOpenSideMenu={isOpenSideMenu}
          setIsOpenSideMenu={setIsOpenSideMenu}
        ></HeaderBar>
      </div>
      <MainMap></MainMap>
    </div>
  );
}

export default App;
