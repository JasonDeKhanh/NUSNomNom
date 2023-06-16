import { createContext, useReducer } from "react";

export const CampusesContext = createContext();

export const campusesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CAMPUSES":
      const krcampus = action.payload.find(
        (campus) => campus.name === "kentridgecampus"
      );
      return { campuses: action.payload, curCampus: krcampus };
    case "SET_CUR_CAMPUS":
      return {};
    default:
      return state;
  }
};

export function CampusesContextProvider({ children }) {
  const [state, dispatch] = useReducer(campusesReducer, {
    campuses: null,
    curCampus: null,
    curEatery: null,
    curStall: null,
  });

  return (
    <CampusesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CampusesContext.Provider>
  );
}
