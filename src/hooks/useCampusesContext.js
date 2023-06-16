import { CampusesContext } from "../context/CampusContext";
import { useContext } from "react";

export const useCampusesContext = () => {
  const campusesContext = useContext(CampusesContext);

  if (!campusesContext) {
    throw Error(
      "useCampusesContext must be used inside an EateriesContextProvider"
    );
  }

  return campusesContext;
};
