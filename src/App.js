import { useEffect, useState } from "react";
import MainMap from "./components/MainMap";
import { useCampusesContext } from "./hooks/useCampusesContext";

import SideMenu from "./components/SideMenu";
import HeaderBar from "./components/HeaderBar";

function App() {
  const { dispatch } = useCampusesContext();
  // fetch campuses, set kentridge campuses as initial one
  useEffect(() => {
    const fetchAllCampuses = async () => {
      const response = await fetch("/api/campuses/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CAMPUSES", payload: json });
      }
    };

    fetchAllCampuses();
  }, []);

  // Side Menu
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  return (
    <div className="App">
      <div className="absolute top-0 flex bg-red-200">
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
