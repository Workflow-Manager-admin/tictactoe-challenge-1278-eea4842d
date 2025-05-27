import React, { useState, useEffect, useCallback } from 'react';
import './Snake.css';

// PUBLIC_INTERFACE
const Snake = () => {
    const GRID_SIZE = 20;
    const INITIAL_SNAKE = [{ x: 10, y: 10 }];
    const INITIAL_FOOD = { x: 15, y: 15 };
    const INITIAL_DIRECTION = 'RIGHT';
    const GAME_SPEED = 150;

    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Generate random food position
    const generateFood = useCallback(() => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    }, []);

    // Check if two positions collide
    const checkCollision = (pos1, pos2) => {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    };

    // Check if position is outside grid
    const isOutOfBounds = (position) => {
        return (
            position.x < 0 || 
            position.x >= GRID_SIZE || 
            position.y < 0 || 
            position.y >= GRID_SIZE
        );
    };

    // Move snake
    const moveSnake = useCallback(() => {
        if (isPaused || isGameOver) return;

        setSnake(currentSnake => {
            const head = { ...currentSnake[0] };
            
            switch (direction) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
                default: break;
            }

            // Check wall collision
            if (isOutOfBounds(head)) {
                setIsGameOver(true);
                return currentSnake;
            }

            // Check self collision
            if (currentSnake.some(segment => checkCollision(segment, head))) {
                setIsGameOver(true);
                return currentSnake;
            }

            const newSnake = [head, ...currentSnake];

            // Check food collision
            if (checkCollision(head, food)) {
                setFood(generateFood());
                setScore(s => s + 1);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, generateFood, isGameOver, isPaused]);

    // Handle keyboard input
    const handleKeyPress = useCallback((event) => {
        if (isGameOver) return;

        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'DOWN') setDirection('UP');
                break;
            case 'ArrowDown':
                if (direction !== 'UP') setDirection('DOWN');
                break;
            case 'ArrowLeft':
                if (direction !== 'RIGHT') setDirection('LEFT');
                break;
            case 'ArrowRight':
                if (direction !== 'LEFT') setDirection('RIGHT');
                break;
            case ' ':
                setIsPaused(p => !p);
                break;
            default:
                break;
        }
    }, [direction, isGameOver]);

    // Game loop
    useEffect(() => {
        const gameInterval = setInterval(moveSnake, GAME_SPEED);
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            clearInterval(gameInterval);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [moveSnake, handleKeyPress]);

    // Reset game
    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection(INITIAL_DIRECTION);
        setIsGameOver(false);
        setScore(0);
        setIsPaused(false);
    };

    // Render game grid
    const renderGrid = () => {
        const grid = [];
        
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const isSnake = snake.some(segment => checkCollision(segment, { x, y }));
                const isHead = checkCollision(snake[0], { x, y });
                const isFood = checkCollision(food, { x, y });
                
                grid.push(
                    <div
                        key={`${x}-${y}`}
                        className={`cell ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${isFood ? 'food' : ''}`}
                    />
                );
            }
        }
        
        return grid;
    };

    return (
        <div className="snake-game">
            <div className="status">
                <span>Score: {score}</span>
                {isPaused && <span>PAUSED</span>}
                {isGameOver && <span>GAME OVER!</span>}
            </div>
            <div className="snake-grid">
                {renderGrid()}
            </div>
            <div className="controls">
                <button className="btn reset-button" onClick={resetGame}>
                    {isGameOver ? 'Play Again' : 'Reset Game'}
                </button>
                <button className="btn pause-button" onClick={() => setIsPaused(p => !p)}>
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
            </div>
            <div className="instructions">
                <p>Use arrow keys to control the snake.</p>
                <p>Press spacebar to pause/resume.</p>
            </div>
        </div>
    );
};

export default Snake;
