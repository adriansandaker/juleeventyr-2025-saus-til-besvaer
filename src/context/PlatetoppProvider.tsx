import React, { useContext, useMemo, useState } from "react";
import PlatetoppContext from "./PlatetoppContext";
import { UserData } from "./types";

const PlatetoppProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserData[]>([]);

  const updateUsers = (latestUsers: UserData[]) => {
    setUsers(latestUsers);
  }

  const value = useMemo(
    () => ({
      users,
      updateUsers,
    }),
    [users]
  );

  return (
    <PlatetoppContext.Provider value={value}>
      {children}
    </PlatetoppContext.Provider>
  );
};

export const usePlatetopp = () => {
  const context = useContext(PlatetoppContext);
  return context;
};

export default PlatetoppProvider;
