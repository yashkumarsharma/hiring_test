import { useRef } from "react";
import buttonClickSound from "../assets/audio/button-click.mp3";

const useClickSound = (sound = buttonClickSound) => {
  const audioRef = useRef(new Audio(sound));

  const volume = localStorage.getItem("sfxVolume") !== null ? parseInt(localStorage.getItem("sfxVolume"), 10) : 50

  // Set the volume of the hover sound
  audioRef.current.volume = volume / 100;

  const playHoverSound = () => {
    audioRef.current.currentTime = 0; // Reset to the start
    audioRef.current.play().catch((error) => {
      console.error("Hover sound playback failed:", error);
    });
  };

  return playHoverSound;
};

export default useClickSound;
