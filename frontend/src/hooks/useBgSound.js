import { useRef } from "react";
import backgroundMusic from "../assets/audio/background-music.mp3";

const useBgSound = (hoverSound = backgroundMusic, setVolume) => {
  const audioRef = useRef(new Audio(hoverSound));

  const volume = setVolume ?? localStorage.getItem("bgVolume") !== null ? parseInt(localStorage.getItem("bgVolume"), 10) : 50

  // Set the volume of the hover sound
  audioRef.current.volume = volume / 100;
  audioRef.current.loop = true;

  const playSound = () => {
    audioRef.current.currentTime = 0; // Reset to the start
    audioRef.current.play().catch((error) => {
      console.error("BG sound playback failed:", error);
    });
  };

  return playSound;
};

export default useBgSound;
