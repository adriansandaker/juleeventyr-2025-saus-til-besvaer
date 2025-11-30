import { useWebSocket } from "@/hooks/useWebsocket";
import Kokeplate from "./Kokeplate";
import styles from "./Platetopp.module.css";
import { usePlatetopp } from "@/context/PlatetoppProvider";

const Platetopp = () => {
  useWebSocket();

  const { users } = usePlatetopp();

  return (
    <div className={styles.platetopp}>
      {users.map((user) => {
        console.log(user);
        return (
          <Kokeplate
            id={user.userId}
            key={user.userId}
            currentSetting={user.currentInnstilling}
          />
        );
      })}
    </div>
  );
};

export default Platetopp;
