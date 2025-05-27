import React, { useState } from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe/TicTacToe';
import Snake from './components/Snake/Snake';

function App() {
  const [currentGame, setCurrentGame] = useState('tictactoe');

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> Game Challenge
            </div>
            <div className="game-switcher">
              <button 
                className={`btn ${currentGame === 'tictactoe' ? 'active' : ''}`}
                onClick={() => setCurrentGame('tictactoe')}
              >
                Tic Tac Toe
              </button>
              <button 
                className={`btn ${currentGame === 'snake' ? 'active' : ''}`}
                onClick={() => setCurrentGame('snake')}
              >
                Snake
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Welcome to</div>
            <h1 className="title">
              {currentGame === 'tictactoe' ? 'Tic Tac Toe' : 'Snake'}
            </h1>
            <div className="description">
              {currentGame === 'tictactoe' ? (
                'A classic game where two players take turns marking spaces in a 3×3 grid. The player who succeeds in placing three marks in a horizontal, vertical, or diagonal row wins!'
              ) : (
                'Guide the snake to eat the food and grow longer, but be careful not to hit the walls or yourself! Use arrow keys to control the snake and space to pause.'
              )}
            </div>
          </div>
          
          <div className="game-container">
            {currentGame === 'tictactoe' ? <TicTacToe /> : <Snake />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;