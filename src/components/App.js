import '../styles/App.css';
import React, { useState } from "react";
import Game, {NBR_OF_FRAME} from "./Game";

//Frame constructions
const Frame = ({ frameNumber, leftBox, midBox, rightBox, extraBox, score }) => (
  <div className="frame">
    <div className="frame-number">{frameNumber}</div>
    <div className="frame-score">
      <div className="box left">{leftBox}</div>
      <div className="box middel">{midBox}</div>
      <div className="box right">{rightBox}</div>
      <div className="box extra">{extraBox}</div>
    </div>
    <div className="running-score">{!isNaN(score) && score}</div>
  </div>
);

//Construction of the buttons to indicate the number of pins dropped and the reset button of the game
const Controls = ({ handleRoll, handleReset, pinsUp }) => (
  <div className="controls">
    <div className="controls-left">
      {[...Array(pinsUp + 1)].map((o, i) => (
        <button key={i} className="roll" onClick={() => handleRoll(i)}>
          {i}
        </button>
      ))}
    </div>
    <div className="controls-right">
      <div className="roll reset" onClick={() => handleReset()}>
        Reset Game {pinsUp}
      </div>
    </div>
  </div>
);

//Create with a loop the score board
const ScoreBoard = () => {
  const [game] = useState(Game.create());
  const [score, setScore ] = useState(game.score());

  const round = pins => {
    game.round(pins);
    setScore(game.score());
  };

  const reset = () => {
    game.reset();
    setScore(game.score());
  };

  const pinsUp = game.getPinsUp();

  return (
    <div>
      <Controls handleRoll={round} handleReset={reset} pinsUp={pinsUp} />


      <div className="score-board">
        {[...Array(NBR_OF_FRAME)].map((_, i) => (
          <Frame
            key={i}
            frameNumber={i + 1}
            leftBox={score[i].leftBox}
            midBox={score[i].midBox}
            rightBox={score[i].rightBox}
            extraBox={score[i].extraBox}
            score={score[i].cumulativeScore}
          />
        ))}
      </div>
    </div>
  );
}


function App() {

  return (
    <div className="App">
      <header className="App-header">
       <h1>Bowling Score</h1>
      </header>
      <main>
      <ScoreBoard />
      </main>
    </div>
  );
}

export default App;
