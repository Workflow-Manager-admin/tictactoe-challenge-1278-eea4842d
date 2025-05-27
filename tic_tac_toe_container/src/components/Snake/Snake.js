import React, { useState, useEffect, useCallback } from 'react';
import './Snake.css';

// PUBLIC_INTERFACE
const Snake = () => {
    // Game settings
    const BOARD_SIZE = 20;
    const INITIAL_SNAKE = [{ x: 10, y: 10 }];
    const INITIAL_DIRECTION = 'RIGHT';
    const GAME_SPEED = 150;

    // Game state
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Generate random food position
    const generateFood = useCallback(() => {
        const newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
        };
        
        // Ensure food doesn't spawn on snake
        const isOnSnake = snake.some(segment => 
            segment.x === newFood.x && segment.y === newFood.y
        );
        
        if (isOnSnake) {
            return generateFood();
        }
        return newFood;
    }, [snake]);

    // Handle keyboard controls
    const handleKeyPress = useCallback((event) => {
        if (isGameOver) return;

        const keyDirections = {
            'ArrowUp': 'UP',
            'ArrowDown': 'DOWN',
            'ArrowLeft': 'LEFT',
            'ArrowRight': 'RIGHT',
            ' ': 'PAUSE'  // Space bar for pause
        };

        const newDirection = keyDirections[event.key];
        if (!newDirection) return;

        if (newDirection === 'PAUSE') {
            setIsPaused(prev => !prev);
            return;
        }

        // Prevent 180-degree turns
        const invalidMoves = {
            'UP': 'DOWN',
            'DOWN': 'UP',
            'LEFT': 'RIGHT',
            'RIGHT': 'LEFT'
        };

        if (invalidMoves[newDirection] !== direction) {
            setDirection(newDirection);
        }
    }, [direction, isGameOver]);

    // Set up keyboard event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    // Main game loop
    useEffect(() => {
        if (isGameOver || isPaused) return;

        const moveSnake = () => {
            const head = { ...snake[0] };
            
            // Calculate new head position
            switch (direction) {
                case 'UP':
                    head.y -= 1;
                    break;
                case 'DOWN':
                    head.y += 1;
                    break;
                case 'LEFT':
                    head.x -= 1;
                    break;
                case 'RIGHT':
                    head.x += 1;
                    break;
                default:
                    break;
            }

            // Check for collisions
            if (
                head.x < 0 || head.x >= BOARD_SIZE ||
                head.y < 0 || head.y >= BOARD_SIZE ||
                snake.some(segment => segment.x === head.x && segment.y === head.y)
            ) {
                setIsGameOver(true);
                return;
            }

            const newSnake = [head, ...snake];

            // Check if snake ate food
            if (head.x === food.x && head.y === food.y) {
                setScore(prev => prev + 10);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        const gameInterval = setInterval(moveSnake, GAME_SPEED);
        return () => clearInterval(gameInterval);
    }, [snake, direction, food, isGameOver, isPaused, generateFood]);

    // Reset game
    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood());
        setScore(0);
        setIsGameOver(false);
        setIsPaused(false);
    };

    // Render game board
    const renderBoard = () => {
        const board = [];
        
        for (let y = 0; y < BOARD_SIZE; y++) {
            const row = [];
            for (let x = 0; x < BOARD_SIZE; x++) {
                // Determine cell content
                const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                const isHead = snake[0].x === x && snake[0].y === y;
                const isFood = food.x === x && food.y === y;
                
                const cellClass = `cell${isSnake ? ' snake' : ''}${isHead ? ' head' : ''}${isFood ? ' food' : ''}`;
                
                row.push(<div key={`${x}-${y}`} className={cellClass} />);
            }
            board.push(<div key={y} className="row">{row}</div>);
        }
        
        return board;
    };

    return (
        <div className="snake-game">
            <div className="game-header">
                <div className="score">Score: {score}</div>
                {isPaused && <div className="paused">PAUSED</div>}
            </div>
            
            <div className="board">
                {renderBoard()}
            </div>

            {isGameOver && (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Final Score: {score}</p>
                    <button className="btn" onClick={resetGame}>
                        Play Again
                    </button>
                </div>
            )}

            <div className="controls">
                <p>Use arrow keys to move</p>
                <p>Space to pause</p>
                <button className="btn" onClick={resetGame}>
                    Reset Game
                </button>
            </div>
        </div>
    );
};

export default Snake;
