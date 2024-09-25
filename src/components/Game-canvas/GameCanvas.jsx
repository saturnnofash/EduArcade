import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Container } from 'reactstrap';
import './gamecanvas.css'
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

  const pixelSize = 15;
  const gravity = 0.5;
  const groundLevel = 500;
  const [canvasSize] = useState({ width: 1408, height: 724 });

  const frameWidth = 64;
  const frameHeight = 42;
  const scaleFactor = 1.5;
  const totalFrames = 6;

  const [questionsData, setQuestionsData] = useState(
    QuestionData.easy_questions[0],
    QuestionData.medium_questions[0],
    QuestionData.hard_questions[0],
    QuestionData.very_hard_questions[0],
  );
  const [currentQuestion, setCurrentQuestion] = useState(null);

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
      alert('Correct!');
      // setScore(prevScore => prevScore + 1);
    } else {
      alert('Incorrect. Try again!');
    }
    getNextQuestion();
  };

  const getNextQuestion = () => {
    const currentCategory = 'easy_questions'; // Change as needed
    const currentIndex = questionsData[currentCategory].indexOf(currentQuestion);
    const nextQuestion = questionsData[currentCategory][currentIndex + 1] || null;
    setCurrentQuestion(nextQuestion);
  };



  const tileSize = 32;

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


    const spriteSheet = facingRight ? walkRightSpriteSheet.current : walkLeftSpriteSheet.current;

    if (spriteSheet) {
      const sx = currentFrame * frameWidth;
      const scaledWidth = frameWidth * scaleFactor;
      const scaledHeight = frameHeight * scaleFactor;
      ctx.drawImage(
        spriteSheet,
        sx, 0,
        frameWidth, frameHeight,
        position.x * pixelSize, position.y,
        scaledWidth, scaledHeight
      );
    }
  }, [canvasSize, facingRight, currentFrame, pixelSize, groundLevel, tileMap, tileset, walkLeftSpriteSheet, walkRightSpriteSheet, position]);

  const updatePosition = useCallback(() => {
    setPosition((prev) => {
      let newY = prev.y + velocity.y;
      if (newY + frameHeight * scaleFactor >= groundLevel) {
        newY = groundLevel - frameHeight * scaleFactor;
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));
        setIsJumping(false);
      } else {
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: prevVelocity.y + gravity }));
      }

      return { ...prev, y: newY };
    });
  }, [velocity.y, gravity, groundLevel, scaleFactor, frameHeight]);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (!isJumping) {
          setVelocity((prevVelocity) => ({ ...prevVelocity, y: -10 }));
          setIsJumping(true);
        }
        break;
      case 'ArrowLeft':
      case 'a':
        setPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 1) }));
        setFacingRight(false);
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
        break;
      case 'ArrowRight':
      case 'd':
        setPosition((prev) => ({ ...prev, x: Math.min((canvasSize.width / pixelSize) - 1, prev.x + 1) }));
        setFacingRight(true);
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
        break;
      default:
        break;
    }

  }, [canvasSize.width, isJumping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gameLoop = setInterval(() => {
      updatePosition();
      draw(ctx);
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearInterval(gameLoop);
        window.removeEventListener('keydown', handleKeyDown);
      };
    });
  }, [draw, handleKeyDown, updatePosition, position, velocity, currentFrame, facingRight]);


  return (
    <Container>
      <div className='game_Content' style={{ width: canvasSize.width, height: canvasSize.height }}>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{ border: '1px solid black', position: 'absolute', top: 0, left: 0 }}
        />
        <h1 className='title' style={{ position: 'absolute', top: '10px', left: '10px', color: 'black' }}>MIND MINE</h1>
        <span className="level">Level: 1</span>
        <span className='questions'>
          {currentQuestion.question ? currentQuestion.question : 'Loading question...'}
        </span>
        <div className="optionholder">
          <div className="options">
            {currentQuestion ? currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            )) : 'Loading options...'}
          </div>
          <div className="options">
            {currentQuestion ? currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            )) : 'Loading options...'}
          </div>
          <div className="options">
            {currentQuestion ? currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            )) : 'Loading options...'}
          </div>
          <div className="options">
            {currentQuestion ? currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            )) : 'Loading options...'}
          </div>
        </div>
        <button className='gamebutton' onClick={getNextQuestion}>Next Question</button>
      </div>
    </Container>
  );
};

export default GameCanvas;
