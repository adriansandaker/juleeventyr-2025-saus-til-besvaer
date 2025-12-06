import { useState } from "react";
import styles from "./Kokeplate.module.css";
import { usePlatetopp } from "@/context/PlatetoppProvider";

const Kokeplate = ({
  id,
  increment,
  decrement,
  currentInnstilling,
  disableInteraction,
}: {
  id: string;
  currentSetting: number;
  increment: () => void;
  decrement: () => void;
  currentInnstilling: number;
  disableInteraction: boolean;
}) => {
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
        <button disabled={disableInteraction} onClick={handleDecrease}>
          -
        </button>
        <div className={styles.indicator}>{currentInnstilling}</div>
        <button disabled={disableInteraction} onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default Kokeplate;
