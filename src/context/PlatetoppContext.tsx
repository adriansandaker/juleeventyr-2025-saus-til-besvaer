import { createContext } from "react";
import { UserData } from "./types";

interface PlatetoppContextType {
  users: UserData[];
  updateUsers: (users: UserData[]) => void;
}

const PlatetoppContext = createContext<PlatetoppContextType>({
  users: [],
  updateUsers: () => {},
});

export default PlatetoppContext;