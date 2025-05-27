import React from 'react';
import './App.css';
import Snake from './components/Snake/Snake';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">🐍</span> Snake Game
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Welcome to</div>
            <h1 className="title">Snake Game</h1>
            <div className="description">
              Control the snake using arrow keys to eat food and grow longer. 
              Be careful not to hit the walls or yourself! Press space to pause the game.
            </div>
          </div>
          
          <div className="game-container">
            <Snake />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
