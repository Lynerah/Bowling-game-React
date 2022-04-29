import React, { useState } from "react";
import Game, {NBR_OF_FRAME} from "./Game";
import Frame from "./Frame";
import Controls from "./Controls";

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
            frameTitle={i + 1}
            firstFrameScoreLabel={score[i].firstFrameScoreLabel}
            secondFrameScoreLabel={score[i].secondFrameScoreLabel}
            thirdFrameScoreLabel={score[i].thirdFrameScoreLabel}
            extraFrameScoreLabel={score[i].extraFrameScoreLabel}
            extraFrameScoreLabel2={score[i].extraFrameScoreLabel2}
            score={score[i].matchScore} 
          />
        ))}
      </div>
    </div>
  );
}
export default ScoreBoard;