import React, { useContext, useState } from "react";
import PlatetoppContext from "./PlatetoppContext";
import { UserData } from "./types";

const PlatetoppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentInnstilling, setCurrentInnstilling] = useState(0);
  const [users, setUsers] = useState<UserData[]>([]);

  function handleDecrement() {
    setCurrentInnstilling((prev) => prev - 1);
  }

  function handleIncrement() {
    setCurrentInnstilling((prev) => prev + 1);
  }

  function handleUpdateUsers(latestUsers: UserData[]) {
    setUsers(latestUsers);
  }

  function handleUpdateCurrentInstilling() {
    setCurrentInnstilling(currentInnstilling);
  }

  return (
    <PlatetoppContext.Provider
      value={{
        currentInnstilling,
        users,
        decrement: handleDecrement,
        increment: handleIncrement,
        updateUsers: handleUpdateUsers,
        updateCurrentInstilling: handleUpdateCurrentInstilling,
      }}
    >
      {children}
    </PlatetoppContext.Provider>
  );
};

export const usePlatetopp = () => {
  const context = useContext(PlatetoppContext);
  return context;
}

export default PlatetoppProvider;
