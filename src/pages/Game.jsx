import React from 'react'
import Header from '../components/Header/Header'
import Minemind from '../components/Game-canvas/test'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Space, DoorOpenIcon as Enter } from 'lucide-react'

export default function Game() {
  return (
    <div>
      <Header />
      <main className="game-layout">
        {/* Game Canvas */}
        <div className='game-area' >
          <Minemind />
        </div>
        
        {/* Instructions Panel */}
        <div className="instructions-panel">
          <h2>How to Play</h2>
          
          <div className="controls-section">
            <h3>Movement Controls</h3>
            <ul>
              {[
                { icon: ArrowUp, text: 'Move up' },
                { icon: ArrowDown, text: 'Move down' },
                { icon: ArrowLeft, text: 'Move left' },
                { icon: ArrowRight, text: 'Move right' },
              ].map((control, index) => (
                <li key={index}>
                  <control.icon />
                  <span>{control.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="controls-section">
            <h3>Action Controls</h3>
            <ul>
              {[
                { icon: Space, text: 'Jump' },
                { icon: Enter, text: 'Select/Pick Answer' },
              ].map((control, index) => (
                <li key={index}>
                  <control.icon />
                  <span>{control.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="instructions-footer">
            <p>
              Navigate through the game using these controls. Jump over obstacles and select the correct answers to progress in your learning journey!
            </p>
          </div>
        </div>
      </main>
      <style jsx>{`
        .game-container {
          height: 100vh;
          width: 100vw;
          background-color: #f0f0f0;
        }
        .game-layout {
          display: flex;
          padding-top: 10px;
          max-width: 100vw;
          margin: 0 auto;
        }
        .game-area {
          border-radius: 8px;
        }
        .instructions-panel {
          flex: 1;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }
        h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #555;
        }
        .controls-section {
          margin-bottom: 20px;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        li svg {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
        .instructions-footer {
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          margin-top: 20px;
        }
        .instructions-footer p {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        @media (max-width: 768px) {
          .game-layout {
            flex-direction: column;
          }
          .game-area {
            margin-right: 0;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  )
}