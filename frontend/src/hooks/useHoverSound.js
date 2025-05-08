import { useRef } from "react";
import buttonHoverSound from "../assets/audio/button-hover.mp3";

const useHoverSound = (hoverSound = buttonHoverSound) => {
  const hoverAudioRef = useRef(new Audio(hoverSound));

  const volume = localStorage.getItem("sfxVolume") !== null ? parseInt(localStorage.getItem("sfxVolume"), 10) : 50

  // Set the volume of the hover sound
  hoverAudioRef.current.volume = volume / 100;

  const playHoverSound = () => {
    hoverAudioRef.current.currentTime = 0; // Reset to the start
    hoverAudioRef.current.play().catch((error) => {
      console.error("Hover sound playback failed:", error);
    });
  };

  return playHoverSound;
};

export default useHoverSound;
