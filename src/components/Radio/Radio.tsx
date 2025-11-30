"use client";

import npmNyheter from "./shows/npm_radio_-_nyheter_desember.mp3";

import playButton from "./assets/playbutton.svg";
import pauseButton from "./assets/pausebutton.svg";

import styles from "./Radio.module.css";

const Radio = () => {
  const audio = new Audio(npmNyheter);

  const playAudio = () => {
    audio.play();
  };

  const pauseAudio = () => {
    audio.pause();
  }

  return (
    <div id="radio" className={styles.container}>
      <div className={styles.logo}>
        <p>DAB</p>
        <p>BOX</p>
      </div>
      <div>
        <div className={styles.display}>
        <ScrollingText text="NPM Nyheter Radio - 16.02.2025" />
      </div>
      </div>
     <div>
       <button onClick={playAudio}><img src={playButton} alt="Play" /></button>
      <button onClick={pauseAudio}><img src={pauseButton} alt="Pause" /></button>
     </div>
    </div>
  );
};

const ScrollingText = ({ text }: { text: string }) => {
  return (
    <div className={styles.scrollingText}>
      <p>{text}</p>
    </div>
  );
};

export default Radio;
