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
    case "REMOVE_CUR_EATERY":
      return {
        campuses: state.campuses,
        curCampus: state.curCampus,
        curEatery: null,
        curStall: null,
      };
    case "SET_CUR_EATERY":
      return {
        campuses: state.campuses,
        curCampus: state.curCampus,
        curEatery: action.payload,
      };
    case "SET_CUR_STALL":
      return {
        campuses: state.campuses,
        curCampus: state.curCampus,
        curEatery: state.curEatery,
        curStall: action.payload,
      };
    case "REMOVE_CUR_STALL":
      return {
        campuses: state.campuses,
        curCampus: state.curCampus,
        curEatery: state.curEatery,
        curStall: null,
      };
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
