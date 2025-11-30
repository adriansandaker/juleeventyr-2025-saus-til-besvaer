import { createContext } from "react";
import { UserData } from "./types";

interface PlatetoppContextType {
  currentInnstilling: number;
  users: UserData[];
  decrement: () => void;
  increment: () => void;
  updateUsers: (latestUsers: UserData[]) => void;
  updateCurrentInstilling: (value: number) => void;
}

const PlatetoppContext = createContext<PlatetoppContextType>({
  currentInnstilling: 0,
  users: [],
  decrement: () => {},
  increment: () => {},
  updateUsers: () => {},
  updateCurrentInstilling: () => {},
});

export default PlatetoppContext;