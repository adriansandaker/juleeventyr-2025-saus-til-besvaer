import { useWebSocket } from "@/hooks/useWebsocket";
import Kokeplate from "./Kokeplate";
import styles from "./Platetopp.module.css";
import { usePlatetopp } from "@/context/PlatetoppProvider";

const Platetopp = () => {
  const { userId, increment, decrement } = useWebSocket();

  const { users } = usePlatetopp();

  return (
    <div className={styles.platetopp}>
      {users.map((user) => {
        console.log(user);
        return (
          <div>
            <Kokeplate
            disableInteraction={user.userId !== userId}
            id={user.userId}
            key={user.userId}
            currentSetting={user.currentInnstilling}
            increment={() => increment()}
            decrement={() => decrement()}
            currentInnstilling={user.currentInnstilling}
          />
          </div>
        );
      })}
    </div>
  );
};

export default Platetopp;
