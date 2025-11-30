import { useState } from "react";
import styles from "./Kokeplate.module.css";
import { usePlatetopp } from "@/context/PlatetoppProvider";

const Kokeplate = ({
  id,
  currentSetting,
}: {
  id: string;
  currentSetting: number;
}) => {
  const { currentInnstilling, decrement, increment } = usePlatetopp();

  function handleIncrease() {
    increment();
  }

  function handleDecrease() {
    decrement();
  }

  return (
    <div className={styles.container}>
      <div className={styles.kokeplate}></div>
      <div className={styles.controls}>
        <button onClick={handleDecrease}>-</button>
        <div className={styles.indicator}>{currentInnstilling}</div>
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
};

export default Kokeplate;
