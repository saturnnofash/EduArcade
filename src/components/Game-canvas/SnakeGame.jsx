// src/SnakeGame.js
import React, { useState, useEffect, useRef } from 'react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 }); // Move right initially
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const gridSize = 20; // Grid size of the canvas
  const tileSize = 20; // Each tile is 20x20 pixels
  const gameSpeed = 200; // Snake movement speed in milliseconds

  const getRandomFoodPosition = () => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  };

  // Handle keypress for snake movement
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  // Main game loop
  const gameLoop = () => {
    if (isGameOver) return;

    const newSnake = [...snake];
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check if snake hits the wall or itself
    if (
      head.x < 0 || head.y < 0 || 
      head.x >= gridSize || head.y >= gridSize ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setIsGameOver(true);
      return;
    }

    // Add new head to the snake
    newSnake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      setFood(getRandomFoodPosition());
    } else {
      // Remove the tail if not eating food (snake moves forward)
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // Draw everything on the canvas
  const drawGame = (ctx) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw snake
    snake.forEach((segment) => {
      ctx.fillStyle = 'green';
      ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
  };

  // Use effect to handle game loop and canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Listen for keyboard events
    window.addEventListener('keydown', handleKeyDown);

    // Game loop interval
    const gameInterval = setInterval(() => {
      gameLoop();
      drawGame(ctx);
    }, gameSpeed);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake, food, direction, isGameOver]); // Re-run the effect when any of these values change

  // Restart the game when game is over
  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setFood(getRandomFoodPosition());
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Snake Game</h1>
      <h2>Score: {score}</h2>
      <canvas
        ref={canvasRef}
        width={gridSize * tileSize}
        height={gridSize * tileSize}
        style={{ border: '1px solid black', background: '#f0f0f0' }}
      />
      {isGameOver && (
        <div>
          <h2>Game Over</h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
