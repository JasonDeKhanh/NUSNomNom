import { useEffect } from "react";
import MainMap from "./components/MainMap";
import { useCampusesContext } from "./hooks/useCampusesContext";

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

  return (
    <div className="App">
      <MainMap></MainMap>
    </div>
  );
}

export default App;
