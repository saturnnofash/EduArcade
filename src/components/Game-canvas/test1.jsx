import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './gamecanvas.css';
import miningSound from './Game-Assets/sound.mp3';
import correctSound from './Game-Assets/collect-5930.mp3';
import incorrectSound from './Game-Assets/buzzer-or-wrong-answer-20582.mp3';
import bgBlockImage from './Game-Assets/bgblock.jpg';
import questionsData from './questions.json';

const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`btn ${className}`}>
    {children}
  </button>
);

const difficultyLevels = ['easy', 'medium', 'hard', 'very_hard'];

export default function MineMind() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [miningProgress, setMiningProgress] = useState([0, 0, 0, 0]);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [showLevelAnimation, setShowLevelAnimation] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const choiceRefs = useRef([]);
  const hitboxRefs = useRef([]);
  const audioRef = useRef(new Audio(miningSound));
  const correctAudioRef = useRef(new Audio(correctSound));
  const incorrectAudioRef = useRef(new Audio(incorrectSound));
  const gameContainerRef = useRef(null);
  
  const currentQuestions = questionsData[`${difficultyLevels[difficulty]}_questions`];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    choiceRefs.current = choiceRefs.current.slice(0, currentQuestion.options.length);
    hitboxRefs.current = hitboxRefs.current.slice(0, currentQuestion.options.length);
  }, [currentQuestion]);

  useEffect(() => {
    // Preload audio files
    audioRef.current.load();
    correctAudioRef.current.load();
    incorrectAudioRef.current.load();
  }, []);

  const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    gameContainerRef.current.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  };

  const handleMouseDown = (index) => {
    if (!gameStarted || isPaused) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      console.warn("Audio playback failed: ", error);
    });

    const intervalId = setInterval(() => {
      setMiningProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] += 0.02;
        if (newProgress[index] >= 1) {
          clearInterval(intervalId);
          handleMiningComplete(index);
        }
        return newProgress;
      });

      createParticle(hitboxRefs.current[index].getBoundingClientRect().left + Math.random() * 100, hitboxRefs.current[index].getBoundingClientRect().top);
      setShakeEffect(true);
    }, 50);

    const handleMouseUp = () => {
      clearInterval(intervalId);
      setShakeEffect(false);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMiningComplete = (index) => {
    const isCorrect = currentQuestion.options[index] === currentQuestion.answer;
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + currentQuestion.points);
      correctAudioRef.current.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      incorrectAudioRef.current.play();
    }

    setMiningProgress((prev) => {
      const newProgress = [...prev];
      newProgress[index] = 1;
      return newProgress;
    });

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setTimeout(() => {
      if (currentQuestionIndex + 1 < currentQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMiningProgress([0, 0, 0, 0]);
      } else if (difficulty + 1 < difficultyLevels.length) {
        setDifficulty(difficulty + 1);
        setCurrentQuestionIndex(0);
        setMiningProgress([0, 0, 0, 0]);
        setShowLevelAnimation(true);
        setTimeout(() => setShowLevelAnimation(false), 2000);
      } else {
        setGameOver(true);
      }
      setLastAnswerCorrect(null);
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setMiningProgress([0, 0, 0, 0]);
    setLastAnswerCorrect(null);
    setGameStarted(false);
    setDifficulty(0);
    setIsPaused(false);
    setShowExitConfirmation(false);
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleExit = () => {
    setShowExitConfirmation(true);
  };

  const confirmExit = () => {
    resetGame();
    setShowExitConfirmation(false);
  };

  const cancelExit = () => {
    setShowExitConfirmation(false);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const difficultyColors = ['#C1E1C1', '#FFD580', '#FF9999', '#C8A2C8'];

  return (
    <div 
      ref={gameContainerRef}
      className={`game-container ${shakeEffect ? 'shake' : ''}`}
      style={{ backgroundColor: gameStarted ? difficultyColors[difficulty] : '#E0F6FF' }}
    >
      <h1 className="game-title">Mine Mind</h1>

      {!gameStarted && !gameOver ? (
        <div className="start-screen">
          <Button onClick={handleGameStart}>Start Game</Button>
          <Button onClick={toggleInstructions}>How to Play</Button>
        </div>
      ) : !gameOver ? (
        <>
          <div className="game-controls">
            <Button onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</Button>
            <Button onClick={handleExit}>Exit</Button>
            <Button onClick={toggleInstructions}>Help</Button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="question-text"
          >
            {currentQuestion.question}
          </motion.div>
          <div className="choices-grid">
            {currentQuestion.options.map((choice, index) => (
              <div
                key={index}
                ref={(el) => (hitboxRefs.current[index] = el)}
                className="choice-hitbox"
                onMouseDown={() => handleMouseDown(index)}
              >
                <motion.div
                  ref={(el) => (choiceRefs.current[index] = el)}
                  className={`choice-block ${
                    lastAnswerCorrect !== null && choice === currentQuestion.answer ? 'correct' : ''
                  } ${lastAnswerCorrect === false && miningProgress[index] >= 1 ? 'incorrect' : ''}`}
                  style={{
                    backgroundImage: `url(${bgBlockImage})`,
                    backgroundSize: 'cover',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {choice}
                  <div 
                    className="crack" 
                    style={{ 
                      clipPath: `polygon(0 0, 100% 0, 100% ${miningProgress[index] * 100}%, 0 ${miningProgress[index] * 100}%)`,
                      backgroundImage: `url(${bgBlockImage})`,
                      backgroundSize: 'cover',
                    }} 
                  />
                </motion.div>
              </div>
            ))}
          </div>
          <div className="game-info">
            <div className="score-display">Score: {score}</div>
            <div className="difficulty-display">Level: {difficultyLevels[difficulty].charAt(0).toUpperCase() + difficultyLevels[difficulty].slice(1)}</div>
          </div>
          <AnimatePresence>
            {showLevelAnimation && (
              <motion.div
                className="level-animation"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{ duration: 2, ease: 'linear' }}
              >
                {difficultyLevels[difficulty].charAt(0).toUpperCase() + difficultyLevels[difficulty].slice(1)} Level
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="game-over-screen">
          <h2 className="game-over-title">Game Over!</h2>
          <p className="final-score">Your final score: {score}</p>
          <Button onClick={resetGame}>Play Again</Button>
          <Button onClick={() => window.location.reload()}>Exit to Main Menu</Button>
        </div>
      )}

      {showExitConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to exit?</h2>
            <p>Your progress will be lost.</p>
            <div className="modal-buttons">
              <Button onClick={() => window.location.reload()}>Yes, Exit</Button>
              <Button onClick={cancelExit}>No, Continue</Button>
            </div>
          </div>
        </div>
      )}

      {showInstructions && (
        <div className="modal">
          <div className="modal-content">
            <h2>How to Play</h2>
            <ol>
              <li>Read the question carefully.</li>
              <li>Click and hold on an answer to start mining it.</li>
              <li>Keep holding until the block is fully mined to submit your answer.</li>
              <li>Correct answers earn points and advance you to the next question.</li>
              <li>Wrong answers will show the correct option but won't earn points.</li>
              <li>Progress through all difficulty levels to win the game!</li>
            </ol>
            <Button onClick={toggleInstructions}>Close</Button>
          </div>
        </div>
      )}

      {isPaused && (
        <div className="modal">
          <div className="modal-content">
            <h2>Game Paused</h2>
            <Button onClick={handlePauseResume}>Resume</Button>
            <Button onClick={handleExit}>Exit</Button>
          </div>
        </div>
      )}
    </div>
  );
}