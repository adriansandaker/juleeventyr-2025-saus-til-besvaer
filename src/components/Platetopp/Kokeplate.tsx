import { useState } from "react";
import styles from "./Kokeplate.module.css";

const Kokeplate = () => {
  const [setting, setSetting] = useState(0);

  function handleIncrease() {
    setSetting((prev) => Math.min(prev + 1, 10));
  }

  function handleDecrease() {
    setSetting((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div className={styles.container}>
      <div className={styles.kokeplate}></div>
      <div className={styles.controls}>
        <button onClick={handleDecrease}>-</button>
        <div className={styles.indicator}>
          {setting}
        </div>
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
};

export default Kokeplate;
