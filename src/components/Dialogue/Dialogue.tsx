import React, { useState, useEffect, useRef } from "react";

import styles from "./Dialogue.module.css";

type DialogueObject = {
  speaker: string;
  text: string;
};

type DialogueProps = {
  dialogues: DialogueObject[];
  charInterval?: number; // ms between each character
};

const Dialogue: React.FC<DialogueProps> = ({
  dialogues,
  charInterval = 40,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    const currentDialogue = dialogues[currentIndex];
    let charIdx = 0;

    intervalRef.current && clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (charIdx < currentDialogue.text.length) {
        setDisplayedText(currentDialogue.text.substring(0, charIdx + 1));
        charIdx++;
      } else {
        setIsComplete(true);
        intervalRef.current && clearInterval(intervalRef.current);
      }
    }, charInterval);
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [currentIndex, dialogues, charInterval]);

  const handleNext = () => {
    if (!isComplete) {
      setDisplayedText(dialogues[currentIndex].text);
      setIsComplete(true);
      intervalRef.current && clearInterval(intervalRef.current);
    } else if (currentIndex < dialogues.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  const currentDialogue = dialogues[currentIndex];

  return !dismissed ? (
    <div className={styles.container}>
      <div style={{ fontWeight: "bold", marginBottom: 8 }}>
        {currentDialogue.speaker}
      </div>
      <div style={{ minHeight: 60, fontSize: 18, marginBottom: 12 }}>
        {displayedText}
        <span style={{ opacity: 0.5 }}>{!isComplete && "|"}</span>
      </div>

      {isComplete && currentIndex === dialogues.length - 1 ? (
        <button className={styles.button} onClick={() => setDismissed(true)}>
          Ferdig
        </button>
      ) : (
        <button onClick={handleNext} className={styles.button}>
          {isComplete
            ? currentIndex < dialogues.length - 1 && "Neste"
            : "Hopp over"}
        </button>
      )}
    </div>
  ) : null;
};

export default Dialogue;
