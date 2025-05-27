import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> Tic Tac Toe Challenge
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Welcome to</div>
            <h1 className="title">Tic Tac Toe</h1>
            <div className="description">
              A classic game where two players take turns marking spaces in a 3×3 grid.
              The player who succeeds in placing three marks in a horizontal, vertical, or
              diagonal row wins!
            </div>
          </div>
          
          <div className="game-container">
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;