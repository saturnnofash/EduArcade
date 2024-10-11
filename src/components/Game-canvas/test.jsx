import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Container } from 'reactstrap';
import './gamecanvas.css';
import GameBg from './Game-Assets/6.png';
import walkRightSprite from './Game-Assets/toright.png';
import walkLeftSprite from './Game-Assets/toleft.png';
import tilesetImage from './Game-Assets/Ground.png';
import QuestionData from './questions.json';


const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 500 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [facingRight, setFacingRight] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New pause state
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const gravity = 0.5;
  const jumpStrength = -15;
  const groundLevel = 500;
  const [canvasSize] = useState({ width: 1408, height: 724 });
  const frameWidth = 64;
  const frameHeight = 64;
  const scaleFactor = 1.5;
  const totalFrames = 6;

  const [questionsData, setQuestionsData] = useState(QuestionData);
  const [currentCategory, setCurrentCategory] = useState('easy_questions');
  const [currentQuestion, setCurrentQuestion] = useState(questionsData[currentCategory][0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);

  const tileSize = 32;

  // Define the function to determine the current section based on x position
  const getCurrentSection = (xPosition) => {
    if (xPosition < canvasSize.width / 4) return 0; // Section 1
    if (xPosition < canvasSize.width / 2) return 1; // Section 2
    if (xPosition < (3 * canvasSize.width) / 4) return 2; // Section 3
    return 3; // Section 4
  };

  const handleOptionSelection = () => {
    const section = getCurrentSection(position.x);
    const selectedOption = currentQuestion.options[section];
    if (selectedOption) {
      handleOptionClick(selectedOption);
    }
  };

  const tileMap = useMemo(() => [
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8],
  ], []);

  const handleOptionClick = (selectedOption) => {
    if (selectedOption === currentQuestion.answer) {
      setMessage('Correct!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setMessage('Incorrect. Try again!');
    }
    getNextQuestion();
  };

  const getNextQuestion = () => {
    const currentIndex = questionsData[currentCategory].indexOf(currentQuestion);
    let nextQuestion = questionsData[currentCategory][currentIndex + 1] || null;

    if (!nextQuestion) {
      if (currentCategory === 'easy_questions') {
        setCurrentCategory('medium_questions');
      } else if (currentCategory === 'medium_questions') {
        setCurrentCategory('hard_questions');
      } else {
        alert('Game Over! Your final score is: ' + score);
        setIsGameOver(true); // Set game over state
        return;
      }
      nextQuestion = questionsData[currentCategory][0];
    }

    setCurrentQuestion(nextQuestion);
    setTimeLeft(10);
  };

  // Timer handling, stops when paused
  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft <= 0) {
      alert('Time\'s up! Moving to the next question.');
      getNextQuestion(); // Move to the next question when time runs out
    }
  }, [timeLeft, isPaused]);

  const backgroundImage = useRef(null);
  useEffect(() => {
    const img = new Image();
    img.src = GameBg;
    img.onload = () => {
      backgroundImage.current = img;
    };
  }, []);

  const walkRightSpriteSheet = useRef(null);
  const walkLeftSpriteSheet = useRef(null);
  useEffect(() => {
    const rightImg = new Image();
    rightImg.src = walkRightSprite;
    rightImg.onload = () => {
      walkRightSpriteSheet.current = rightImg;
    };

    const leftImg = new Image();
    leftImg.src = walkLeftSprite;
    leftImg.onload = () => {
      walkLeftSpriteSheet.current = leftImg;
    };
  }, []);

  const tileset = useRef(null);
  useEffect(() => {
    const img = new Image();
    img.src = tilesetImage;
    img.onload = () => {
      tileset.current = img;
    };
  }, []);

  const draw = useCallback((ctx) => {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    if (backgroundImage.current) {
      ctx.drawImage(backgroundImage.current, 0, 0, canvasSize.width, canvasSize.height);
    } else {
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }

    // Draw tilemap
    if (tileset.current) {
      for (let row = 0; row < tileMap.length; row++) {
        for (let col = 0; col < tileMap[row].length; col++) {
          const tileIndex = tileMap[row][col];
          const sx = (tileIndex % 3) * tileSize;
          const sy = Math.floor(tileIndex / 3) * tileSize;

          ctx.drawImage(
            tileset.current,
            sx, sy,
            tileSize, tileSize,
            col * tileSize, groundLevel + (row - 1) * tileSize,
            tileSize, tileSize
          );
        }
      }
    }

    if (walkRightSpriteSheet.current && walkLeftSpriteSheet.current) {
      const spriteSheet = facingRight ? walkRightSpriteSheet.current : walkLeftSpriteSheet.current;
      const sx = currentFrame * frameWidth;
      const sy = 0;

      const scaledWidth = frameWidth * scaleFactor;
      const scaledHeight = frameHeight * scaleFactor;

      ctx.drawImage(
        spriteSheet,
        sx, sy,
        frameWidth, frameHeight,
        position.x, position.y - (scaledHeight - frameHeight),
        scaledWidth, scaledHeight
      );
    }

    // Draw score and timer
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Time Left: ${timeLeft}`, 10, 60);

    // Draw pause button
    ctx.fillStyle = 'grey';
    ctx.fillRect(canvasSize.width - 100, 20, 80, 40);
    ctx.fillStyle = 'white';
    ctx.fillText(isPaused ? 'Resume' : 'Pause', canvasSize.width - 90, 50);

    // Draw feedback message
    if (message) {
      ctx.fillStyle = 'red';
      ctx.font = '30px Arial';
      ctx.fillText(message, canvasSize.width / 2 - 75, canvasSize.height / 2);
    }

    // If game is over, show final score message
    if (isGameOver) {
      ctx.fillStyle = 'black';
      ctx.font = '40px Arial';
      ctx.fillText(`Game Over! Your final score is: ${score}`, canvasSize.width / 2 - 200, canvasSize.height / 2);
      ctx.fillText('Press R to Restart', canvasSize.width / 2 - 150, canvasSize.height / 2 + 50);
    }

  }, [canvasSize, currentQuestion, currentFrame, facingRight, position, isPaused, score, timeLeft, message, isGameOver]);

  // Handle pause button click
  // const handlePauseClick = (event) => {
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   const mouseX = event.clientX - rect.left;
  //   const mouseY = event.clientY - rect.top;

  //   if (
  //     mouseX >= canvasSize.width - 100 &&
  //     mouseX <= canvasSize.width - 20 &&
  //     mouseY >= 20 &&
  //     mouseY <= 60
  //   ) {
  //     setIsPaused((prev) => !prev);
  //   }
  // };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return; // Ensure the canvas exists before accessing its context

    const context = canvas.getContext('2d');

    let animationFrameId;
    const render = () => {
      if (!isPaused) {
        draw(context);
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw, isPaused]);


  useEffect(() => {
    // Keyboard event handlers
    const handleKeyDown = (e) => {
      if (isGameOver) {
        if (e.key === 'r' || e.key === 'R') {
          restartGame(); // Restart the game
        }
        return; // Do not handle other keys if game is over
      }

      if (e.key === 'ArrowRight') {
        setVelocity((prev) => ({ ...prev, x: 2 }));
        setFacingRight(true);
      } else if (e.key === 'ArrowLeft') {
        setVelocity((prev) => ({ ...prev, x: -2 }));
        setFacingRight(false);
      } else if (e.key === ' ' && !isJumping) {
        setVelocity((prev) => ({ ...prev, y: jumpStrength }));
        setIsJumping(true);
      } else if (e.key === 'Enter') {
        handleOptionSelection();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        setVelocity((prev) => ({ ...prev, x: 0 }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, position.x, isGameOver]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      draw(ctx);
    }

    const updatePosition = () => {
      setPosition((prevPosition) => {
        let newY = prevPosition.y + velocity.y;

        // Check if the character hits the ground
        if (newY + frameHeight * scaleFactor >= groundLevel) {
          newY = groundLevel - frameHeight * scaleFactor;
          setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));
          setIsJumping(false);
        } else {
          setVelocity((prevVelocity) => ({ ...prevVelocity, y: prevVelocity.y + gravity }));
        }

        // Calculate new x position based on velocity
        const newX = prevPosition.x + velocity.x;

        return {
          x: newX,
          y: newY,
        };
      });
    };

    const animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [draw, velocity, groundLevel, frameHeight, scaleFactor]);

  useEffect(() => {
    if (position.y >= groundLevel) {
      setVelocity((prev) => ({ ...prev, y: 0 }));
      setIsJumping(false);
    }
  }, [position.y]);

  const handlePauseClick = () => {
    setIsPaused((prev) => !prev);
  };

  const restartGame = () => {
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(10);
    setCurrentCategory('easy_questions');
    setCurrentQuestion(questionsData['easy_questions'][0]);
    setMessage('');
    setPosition({ x: 0, y: groundLevel });
  };

  const handleStartGame = () => {
    setShowGame(true);
  };
  return (
    <Container>
      {!showGame ? (
        <div className="entrance-page">
          <h1 className='title'>MIND MINE</h1>
          <h2 className="title">Welcome to the Game!</h2>
          <button className="gamebutton" onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <div className="game_Content">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onClick={handlePauseClick}
          />
          <div className="score-timer">
            <div>Score: {score}</div>
            <div>Time Left: {timeLeft}</div>
          </div>
          <div className="questions">
            {currentQuestion && (
              <div className="question-container">
                <h2>{currentQuestion.question}</h2>
                <div className="options">
                  {currentQuestion.options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {isPaused && (
            <div className="pause-overlay">
              <button className="pause-button" onClick={handlePauseClick}>Resume</button>
            </div>
          )}
          {isGameOver && (
            <div className="game-over">
              Game Over! Your final score is: {score}. Press 'R' to Restart.
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default GameCanvas;