import React, { useState } from 'react';
import './TicTacToe.css';

// PUBLIC_INTERFACE
const TicTacToe = () => {
    // Initialize game state
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    
    // Calculate winner by checking all possible winning combinations
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal
            [2, 4, 6], // diagonal
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    // Handle click on a square
    const handleClick = (index) => {
        // Create copy of board
        const boardCopy = [...board];
        
        // Return if square is filled or there's a winner
        if (calculateWinner(boardCopy) || boardCopy[index]) {
            return;
        }
        
        // Update board with new move
        boardCopy[index] = isXNext ? 'X' : 'O';
        setBoard(boardCopy);
        setIsXNext(!isXNext);
    };

    // Render a single square
    const renderSquare = (index) => (
        <button 
            className="square" 
            onClick={() => handleClick(index)}
        >
            {board[index]}
        </button>
    );

    // Calculate game status
    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(square => square !== null);
    const status = winner 
        ? `Winner: ${winner}`
        : isDraw 
        ? "Game is a draw!" 
        : `Next player: ${isXNext ? 'X' : 'O'}`;

    // Reset game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="game">
            <div className="status">{status}</div>
            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button className="btn reset-button" onClick={resetGame}>
                Reset Game
            </button>
        </div>
    );
};

export default TicTacToe;
