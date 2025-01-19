import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './styles/MinecraftQuiz.css';
import { useNavigate } from 'react-router-dom';

// Sound effects setup
const SOUNDS = {
  BACKGROUND: '/sounds/background.mp3',  // Placeholder path
  CLICK: '/sounds/click.mp3',           // Placeholder path
  CORRECT: '/sounds/correct.mp3',       // Placeholder path
  WRONG: '/sounds/wrong.mp3',           // Placeholder path
  VICTORY: '/sounds/victory.mp3',       // Placeholder path
  GAME_OVER: '/sounds/game-over.mp3'    // Placeholder path
};

const messagesDB = [
    "It was a trap!",
    "You went off with a bang!",
    "You were slained by an exploding Creeper",
    "bruh, get gud",
    "I'm not mad, just disappointed",
  ];
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messagesDB.length);
    return messagesDB[randomIndex];
  };


  const useSound = () => {
    const [bgMusic, setBgMusic] = useState(null);
  
    useEffect(() => {
      const audio = new Audio(SOUNDS.BACKGROUND);
      audio.loop = true;
      setBgMusic(audio);
  
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }, []);
  
    const playSound = (soundPath) => {
      const audio = new Audio(soundPath);
      audio.play().catch(error => console.log('Audio play failed:', error));
    };
  
    const toggleBgMusic = (forceState) => {
      if (bgMusic) {
        if (forceState === 'play' && bgMusic.paused) {
          bgMusic.play().catch(error => console.log('Background music play failed:', error));
        } else if (forceState === 'pause') {
          bgMusic.pause();
        } else {
          bgMusic.paused ? bgMusic.play() : bgMusic.pause();
        }
      }
    };
  
    return { playSound, toggleBgMusic };
  };

// Game questions database
const questionsDB = {
  easy: [
    { question: "Which of the following represents a function?", answers: ["{(-2, 3), (1, 5), (3, 3), (4, 8)}", "{(1, 3), (1, 4), (3, 2), (4, 5)}", "{(-1, 4), (0, 0), (2, -2), (-1, 5)}"], correct: 0 },
    { question: "What is the domain of f(x) = sqrt(x - 3)?", answers: ["x >= 3", "x > 3", "x < 3"], correct: 0 },
    { question: "Evaluate f(x) = x^2 + 2x + 1 when x = -1.", answers: ["0", "1", "-1"], correct: 0 },
    { question: "What is the range of the function f(x) = |x|?", answers: ["(-∞, ∞)", "[0, ∞)", "(-∞, 0]"], correct: 1 },
    { question: "What is the slope of the line y = -3x + 5?", answers: ["-3", "5", "3"], correct: 0 },
    { question: "If f(x) = x + 2 and g(x) = x^2, what is (f ∘ g)(x)?", answers: ["x^2 + 2", "x + 2", "2x"], correct: 0 },
    { question: "For which value of x is f(x) = 1/(x-2) undefined?", answers: ["1", "2", "0"], correct: 1 },
    { question: "Simplify (2x^2)(3x^3).", answers: ["5x^5", "6x^6", "6x^5"], correct: 2 },
    { question: "Solve for x in x^2 - 4 = 0.", answers: ["x = 2", "x = -2", "x = ±2"], correct: 2 },
    { question: "Which of the following is the graph of y = x^2 - 4?", answers: ["A parabola opening down", "A parabola opening up", "A line with a slope of 2"], correct: 1 },
    { question: "What is the slope-intercept form of a line passing through (0, -2) with a slope of 3?", answers: ["y = 3x + 2", "y = 3x - 2", "y = -3x + 2"], correct: 1 },
    { question: "What type of function is f(x) = 4?", answers: ["Linear", "Quadratic", "Constant"], correct: 2 },
    { question: "Determine if the relation y = sqrt(x) is a function.", answers: ["Yes", "No", "Depends"], correct: 0 },
    { question: "What is the vertex of the parabola y = x^2 - 6x + 9?", answers: ["(3, 0)", "(0, 9)", "(3, -9)"], correct: 0 },
    { question: "What is the asymptote of y = 1/x?", answers: ["x = 0", "y = 0", "x = 0 and y = 0"], correct: 2 },
  ],
  medium: [
    { question: "Which of the following is the equation of a line passing through (1, 2) with a slope of 3?", answers: ["y = 3x + 2", "y = 3x - 1", "y = 3x - 2"], correct: 1 },
    { question: "What is the inverse of f(x) = 3x - 2?", answers: ["f^(-1)(x) = (x + 2)/3", "f^(-1)(x) = (x - 2)/3", "f^(-1)(x) = 3x + 2"], correct: 0 },
    { question: "For g(x) = x^2, what is g(f(x)) if f(x) = x + 1?", answers: ["x + 1", "x^2 + 1", "(x + 1)^2"], correct: 2 },
    { question: "Simplify (x^3)(x^4).", answers: ["x^7", "x^12", "x^6"], correct: 0 },
    { question: "Find the slope of the line passing through the points (2, 3) and (5, 11).", answers: ["4/3", "3/4", "8/3"], correct: 2 },
    { question: "Solve for x: log2(x) = 3.", answers: ["2", "8", "4"], correct: 1 },
    { question: "Evaluate f(x) = 2x^2 - 3 when x = -2.", answers: ["1", "5", "9"], correct: 2 },
    { question: "What is the vertex of the function y = 2x^2 + 8x + 6?", answers: ["(-2, -2)", "(2, 6)", "(-2, 6)"], correct: 0 },
    { question: "What is the equation of the circle with center (0, 0) and radius 5?", answers: ["x^2 + y^2 = 25", "x^2 + y^2 = 5", "x^2 - y^2 = 25"], correct: 0 },
    { question: "Determine the x-intercept of the line y = 2x - 4.", answers: ["x = 2", "x = -2", "x = 1"], correct: 0 },
    { question: "Simplify: (x + 2)^2.", answers: ["x^2 + 4", "x^2 + 4x + 4", "x^2 + 2x + 4"], correct: 1 },
    { question: "Solve for x: 3x^2 - 12 = 0.", answers: ["x = ±2", "x = 2", "x = ±4"], correct: 0 },
    { question: "Find the sum of the roots of x^2 - 5x + 6 = 0.", answers: ["3", "5", "6"], correct: 1 },
    { question: "What is the domain of f(x) = 1/(x^2 - 4)?", answers: ["x ≠ ±2", "x > 2", "x < 2"], correct: 0 },
    { question: "If f(x) = 2x - 3 and g(x) = x^2, what is (g ∘ f)(x)?", answers: ["4x^2 - 12x + 9", "2x^2 - 3x", "(2x - 3)^2"], correct: 2 },
  ],
  hard: [
    { question: "What is the range of f(x) = ln(x - 2)?", answers: ["(-infinity, infinity)", "(0, infinity)", "(-infinity, 0)"], correct: 0 },
    { question: "Solve for x in the equation 2^(x+1) = 16.", answers: ["2", "3", "4"], correct: 1 },
    { question: "Evaluate lim(x → 0) (sin x)/x.", answers: ["0", "1", "undefined"], correct: 1 },
    { question: "What is the equation of a parabola with vertex (1, 2) and focus (1, 4)?", answers: ["x^2 = 4(y - 2)", "(y - 2)^2 = 4(x - 1)", "(x - 1)^2 = 4(y - 2)"], correct: 2 },
    { question: "Find the derivative of f(x) = x^3 - 3x^2 + 5x.", answers: ["3x^2 - 6x + 5", "3x^2 + 5", "3x^2 - 3x + 5"], correct: 0 },
    { question: "Evaluate ∫(x dx) from 0 to 2.", answers: ["2", "4", "8"], correct: 1 },
    { question: "Find the equation of the tangent to the curve y = x^2 at x = 1.", answers: ["y = 2x - 1", "y = 2x - 2", "y = x^2 + 2x"], correct: 1 },
    { question: "Solve for x in the equation 3^(2x) = 81.", answers: ["2", "3", "4"], correct: 0 },
    { question: "What is the domain of f(x) = log(x^2 - 1)?", answers: ["x > 1 or x < -1", "x ≥ 1", "x > 0"], correct: 0 },
    { question: "If f(x) = e^(2x), what is f'(x)?", answers: ["2e^(2x)", "e^(2x)", "2e^x"], correct: 0 },
    { question: "Evaluate lim(x → ∞) (1/x).", answers: ["0", "1", "∞"], correct: 0 },
    { question: "Solve for x in the inequality 3x - 7 > 5.", answers: ["x > 4", "x > -4", "x < 4"], correct: 0 },
    { question: "What is the period of f(x) = sin(2x)?", answers: ["π", "2π", "π/2"], correct: 0 },
    { question: "Solve for x in x^3 - 27 = 0.", answers: ["x = 3", "x = ±3", "x = 9"], correct: 0 },
    { question: "What is the horizontal asymptote of f(x) = (2x + 3)/(x - 1)?", answers: ["y = 2", "y = 1", "y = 0"], correct: 0 },
  ]
};


const GameStates = {
  MENU: 'menu',
  INSTRUCTIONS: 'instructions',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
  VICTORY: 'victory'
};

const EscapeGame = () => {
    const navigate = useNavigate();
  const [gameState, setGameState] = useState(GameStates.MENU);
  const [lives, setLives] = useState(3);
  const [currentRound, setCurrentRound] = useState('easy');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { playSound, toggleBgMusic } = useSound();
  const [usedQuestions, setUsedQuestions] = useState({ easy: [], medium: [], hard: [] });


  useEffect(() => {
    toggleBgMusic();
  }, []);
  toggleBgMusic('play');

  const startGame = () => {
    playSound(SOUNDS.CLICK);
    toggleBgMusic('pause'); // Pause background music when game starts
    setGameState(GameStates.PLAYING);
    setLives(3);
    setScore(0);
    setCurrentRound('easy');
    setQuestionsAnswered(0);
    setUsedQuestions({ easy: [], medium: [], hard: [] });
    getNewQuestion();
  };

  const getNewQuestion = () => {
    const questions = questionsDB[currentRound];
    const availableQuestions = questions.filter((_, index) => 
      !usedQuestions[currentRound].includes(index)
    );
    
    if (availableQuestions.length === 0) {
      // If all questions are used, reset the used questions for this round
      setUsedQuestions(prev => ({ ...prev, [currentRound]: [] }));
      return getNewQuestion();
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const questionIndex = questions.indexOf(availableQuestions[randomIndex]);
    
    setUsedQuestions(prev => ({
      ...prev,
      [currentRound]: [...prev[currentRound], questionIndex]
    }));
    
    setCurrentQuestion(questions[questionIndex]);
  };

  const handleAnswer = (answerIndex) => {
    if (currentQuestion.correct === answerIndex) {
      playSound(SOUNDS.CORRECT);
      const points = currentRound === 'easy' ? 1 : currentRound === 'medium' ? 3 : 5;
      setScore(score + points);
    } else {
      playSound(SOUNDS.WRONG);
      setLives(lives - 1);
      
      if (lives - 1 === 0) {
        playSound(SOUNDS.GAME_OVER);
        setGameState(GameStates.GAME_OVER);
        return;
      }
    }

    setQuestionsAnswered(questionsAnswered + 1);
    
    if (questionsAnswered + 1 === 5) {
      if (currentRound === 'easy') {
        setCurrentRound('medium');
        setQuestionsAnswered(0);
      } else if (currentRound === 'medium') {
        setCurrentRound('hard');
        setQuestionsAnswered(0);
      } else {
        playSound(SOUNDS.VICTORY);
        setGameState(GameStates.VICTORY);
        return;
      }
    }
    
    getNewQuestion();
  };

  const renderLives = () => (
    <div className="flex gap-2">
      {[...Array(lives)].map((_, i) => (
        <Heart key={i} className="text-red-500" size={24} fill="red" />
      ))}
    </div>
  );

  const renderSoundToggle = () => (
    <button
      onClick={() => {
        setIsMuted(!isMuted);
        toggleBgMusic();
      }}
      className="sound-toggle"
    >
      {isMuted ? '🔊' : '🔇'}
    </button>
  );

  const renderMenu = () => (
    <div className="menu-container">
      <h1 className="menu-title">Escape the Village</h1>
      <button 
        onClick={() => startGame()}
        className="menu-button start-button"
      >
        Start Game
      </button>
      <button 
        onClick={handleInstructionTransition}
        className="menu-button instructions-button"
      >
        Instructions
      </button>
      <button 
        onClick={handleQuitTransition}
        className="menu-button quit-button"
      >
        Quit
      </button>
    </div>
  );

  const renderInstructions = () => (
    <div className="instructions-bg-container">
        <div className="instructions-container">
            <h2 className="instructions-title">How to Play</h2>
            <ul className="instructions-list">
                <li>Escape the village by opening the correct trapdoor</li>
                <li>Each wrong trapdoor opened removes a heart</li>
                <li>Survive through 15 trapdoors to fully escape the chasing creepers</li>
                <li>Good luck!</li>
             </ul>
            <button 
             onClick={handleIntMenuTransition}
                className="game-over-button start-button"
            >
                Back to Menu
            </button>
        </div>
    </div>
  );

  const renderGame = () => (
    <div className="game-container">
      <div className="game-header">
        <div className="round-indicator">
          Round: {currentRound.charAt(0).toUpperCase() + currentRound.slice(1)}
        </div>
        <div className="lives-container">
          {renderLives()}
        </div>
        <div className="score-display">
          Score: <span className="score-highlight">{score}</span>
        </div>
      </div>
      
      <div className="question-container">
        <div className="question-text">
          {currentQuestion?.question}
        </div>
        
        <div className="answers-grid">
          {currentQuestion?.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="answer-button"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const handleMenuTransition = () => {
    playSound(SOUNDS.CLICK);
    setIsMuted(!isMuted);
    setGameState(GameStates.MENU);
  };
  const handleIntMenuTransition = () => {
    playSound(SOUNDS.CLICK);
    setGameState(GameStates.MENU);
  };

  const handleInstructionTransition = () => {
    playSound(SOUNDS.CLICK);
    setGameState(GameStates.INSTRUCTIONS);
  };

  const handleQuitTransition = () => {
    playSound(SOUNDS.CLICK);
    toggleBgMusic('pause');
    navigate('/');
  };

  const renderGameOver = () => (
  <div className="end-screen">
    <h2 className="end-title">Game Over!</h2>
    <p className= "end-message">{getRandomMessage()}</p>
    <p className="end-score">Final Score: <span className="score-highlight">{score}</span> </p>
    <button 
      onClick={() => startGame()}
      className="game-over-button start-button"
    >
      Play Again
    </button>
    <button 
      onClick={handleMenuTransition}
      className="game-over-button instructions-button"
    >
      Main Menu
    </button>
  </div>
);

const renderVictory = () => (
  <div className="end-screen-victory">
    <h2 className="end-title-victory">Sweet Victory!</h2>
    <p className="end-message">Congratulations! You completed all rounds!</p>
    <p className="end-score">Final Score: <span className="score-highlight">{score}</span> </p>
    <button 
      onClick={() => startGame()}
      className="game-over-button start-button"
    >
      Play Again
    </button>
    <button 
      onClick={handleMenuTransition}
      className="game-over-button instructions-button"
    >
      Main Menu
    </button>
  </div>
);

  return (
    <div className="minecraft-container">
      {renderSoundToggle()}
      {gameState === GameStates.MENU && renderMenu()}
      {gameState === GameStates.INSTRUCTIONS && renderInstructions()}
      {gameState === GameStates.PLAYING && renderGame()}
      {gameState === GameStates.GAME_OVER && renderGameOver()}
      {gameState === GameStates.VICTORY && renderVictory()}
    </div>
  );
};

export default EscapeGame;