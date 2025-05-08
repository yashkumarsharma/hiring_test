import { useState } from 'react';

import backgroundGif from "../assets/images/play.gif";
import GameTitle from '../components/GameTitle';
import LevelSelectionModal from '../components/LevelSelectionModal';

const LevelSelectionModalTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <GameTitle />
      <div>
        <button
          type="submit"
          className={"game-button"}
          onClick={() => setIsModalOpen(true)}
        >
          Test Level Selection Modal
        </button>
        <div style={{ color: "white", textAlign: "center", margin: "20px" }}>
          {message}
        </div>
      </div>
      <LevelSelectionModal
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false); setMessage('');}}
        handleDifficultySelect={(difficulty) => setMessage(`Selected difficulty: ${difficulty}`)}
        handlePlay={() => setMessage('Accept button clicked')}
      />
    </div>
  );
};

export default LevelSelectionModalTest;