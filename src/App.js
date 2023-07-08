import { useEffect, useState } from "react";
import MainMap from "./components/MainMap";
import { useCampusesContext } from "./hooks/useCampusesContext";

import SideMenu from "./components/SideMenu";
import HeaderBar from "./components/HeaderBar";

import { ReactComponent as LoadingIcon } from "./icons/LoadingSpinner.svg";

function App() {
  const { dispatch } = useCampusesContext();
  // fetch campuses, set kentridge campuses as initial one
  const apiRoot = "https://nusnomnom-backend.onrender.com";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // change loading message to say fetching failed. After 20s, change loading message to "server is probably dead"
  const [isStillAlive, setIsStillAlive] = useState(true);
  useEffect(() => {
    const fetchAllCampuses = async () => {
      setIsLoading(true);
      setError(null);
      const apiString = apiRoot + "/api/campuses/";
      const response = await fetch(apiString);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CAMPUSES", payload: json });
        setIsLoading(false);
      } else {
        setError("Failed to fetch campus");
        setIsLoading(false);
      }
    };

    fetchAllCampuses();

    const timer = setTimeout(() => {
      setIsStillAlive(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
      {isLoading && (
        <div
          className={`relative flex h-[100vh] w-[100vw] flex-col items-center justify-center px-10`}
        >
          <LoadingIcon className="h-20 animate-spin fill-[#FFFFCC]"></LoadingIcon>
          {isStillAlive ? (
            <span className="text-center font-medium text-[#FFFFCC]">
              Waking server up...
            </span>
          ) : (
            <div className="text-center font-medium text-[#FFFFCC]">
              <span>
                If this is taking forever, the server bandwidth might have
                exceeded this month's limit and{" "}
                <span className="whitespace-nowrap">is dead :&#40;</span>
              </span>{" "}
              <br />
              <span>Apologies for the inconveniences</span>
            </div>
          )}
        </div>
      )}
      <MainMap></MainMap>
    </div>
  );
}

export default App;
