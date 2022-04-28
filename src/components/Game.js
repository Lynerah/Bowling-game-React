//Exposes the number of pins and number of turns
export const NBR_OF_FRAME = 5;
const NBR_OF_QUILLES = 15;

//Class taking over all the controls of the game
class Game {
    constructor() {
      this.rounds = [];
      this.currentRoll = 0;
    }
  
    static create = () => new Game();
  
//Number of pins per round
    round = pins => (this.rounds[this.currentRoll++] = pins);
  

//Control btn reset
    reset = () => {
      this.rounds = [];
      this.currentRoll = 0;
    };

//Checking the number of pins still up  
    getPinsUp = () => {
      const scoreData = this.score();
      let nbrOfQuilles = NBR_OF_QUILLES 
      let pinsUp = nbrOfQuilles;
      scoreData.forEach(o => {
        //Get a number and not the NaN
        if (o.pinsUp !== null && !isNaN(o.pinsUp)) {
          pinsUp = o.pinsUp;
        }
      });
      return pinsUp;
    };
  
    //Logic used to calculate scores
    score = () => {
        let scoreData = [];
        let score = 0;
        let roundIndex = 0;

        const nbrOfQuilles = NBR_OF_QUILLES 

        //Create the rounds
        const round1 = () => this.rounds[roundIndex];
        const round2 = () => this.rounds[roundIndex + 1];
        const round3 = () => this.rounds[roundIndex + 2];
        const round4 = () => this.rounds[roundIndex + 3];
        const round5 = () => this.rounds[roundIndex + 4];

        //Calculation of the score and specific actions 
        const sumOfFrameRolls = () => round1() + round2() + round3();

        const isStrike = () => round1() === nbrOfQuilles;
        
        const isSpare = () => sumOfFrameRolls() === nbrOfQuilles;
        
        const isSpareRound2 = () => round1() + round2() === nbrOfQuilles;

        const spareRound2Bonus = () => round3() + round4()
        const spareBonus = () => round4() + round5()
        
        const strikeBonus = () => round2() + round3() + round4();

        //push scores in scoreData 
        const saveScore = (leftBox, midBox, rightBox, score, pinsUp, extraBox) => {
                scoreData.push({
                leftBox,
                midBox,
                rightBox,
                cumulativeScore: score,
                pinsUp,
                extraBox
                });
        };

        //Iteration on frame table
        [...Array(NBR_OF_FRAME)].forEach((_, frameIndex) => {
            //Action when we are on the last frame
            if (frameIndex === 4) {
                if (isStrike()) {
                    score += nbrOfQuilles + strikeBonus();
                    let pinsUp
                    if (round2() === undefined) {
                        pinsUp = nbrOfQuilles;
                    } else if (round2() !== undefined && round3() === undefined) {
                        pinsUp = nbrOfQuilles - ((round1() + round2())% nbrOfQuilles);
                    } else if (round2() !== undefined && round3() !== undefined && round4() === undefined) { 
                        pinsUp = nbrOfQuilles - ((round2() + round3())% nbrOfQuilles);
                    }
                    const roundBonus2 = round2() === 15 ? "X" : round2();
                    const roundBonus3 = round3() === 15 ? "X" : round3();
                    const roundBonus4 = round4() === 15 ? "X" : round4();
                    saveScore("X", roundBonus2, roundBonus3, score, pinsUp, roundBonus4);
                    // saveScore("X", round2(), round3(), score, pinsUp, round4());
                    roundIndex++;
                } else if (isSpareRound2()) {
                    score += nbrOfQuilles + spareRound2Bonus();
                    let pinsUp
                    if (round3() === undefined) {
                        pinsUp = nbrOfQuilles;
                    } else if (round3() !== undefined && round4() === undefined) {
                        pinsUp = nbrOfQuilles - ((round1() + round2() + round3()) % nbrOfQuilles);
                    }
                    // const roundBonus3 = round3() === 15 ? "X" : round3();
                    // const roundBonus4 = round4() === 15 ? "X" : round4();
                    saveScore(round1(), "/", round3(), score, pinsUp, round4());
                    roundIndex+=2;
                } else if (isSpare()) {
                    score += nbrOfQuilles + spareBonus();
                    const pinsUp = nbrOfQuilles
                    saveScore(round1(), round2(), "/", score, pinsUp, round4())
                    roundIndex += 3
                } else {
                    score += sumOfFrameRolls() + round4();
                    let pinsUp;
                    if (round2() === undefined) { 
                        pinsUp = nbrOfQuilles - round1();
                    } else if (round2() !== undefined && round3() === undefined) {
                        pinsUp = nbrOfQuilles - (round1() + round2());
                    } else {
                        pinsUp = nbrOfQuilles;
                    }
                    saveScore(round1(), round2(), round3(), score, pinsUp);
                    roundIndex += 3;
                }
            //Action for the first to the second last frame
            } else if (isStrike()) {
                score += nbrOfQuilles + strikeBonus();
                saveScore("", "", "X", score, nbrOfQuilles);
                roundIndex++;
            } else if (isSpareRound2()) {
                score += nbrOfQuilles + spareRound2Bonus();
                saveScore(round1(), "/", "", score, nbrOfQuilles);
                roundIndex += 2;
            } else if (isSpare()){
                score += nbrOfQuilles + spareBonus();
                saveScore(round1(), round2(), "/", score, nbrOfQuilles);
                roundIndex += 3;
            } else {
                score += sumOfFrameRolls();
                let pinsUp;
                if (round2() === undefined) { 
                    pinsUp = nbrOfQuilles - round1();
                } else if (round2() !== undefined && round3() === undefined) {
                    pinsUp = nbrOfQuilles - (round1() + round2());
                } else {
                    pinsUp = nbrOfQuilles;
                }
                saveScore(round1(), round2(), round3(), score, pinsUp);
                roundIndex += 3;
            }
        });

        return scoreData;
    };
  }
  
  export default Game;
  