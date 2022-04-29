//Exposes the number of pins and number of turns
export const NBR_OF_FRAME = 5;
const TOTAL_PINS_NUMBER = 15;

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
      let totalPinsNumber = TOTAL_PINS_NUMBER
      let pinsUp = totalPinsNumber;
      scoreData.forEach(o => {
        //Get a number and not the NaN
        if (o.pinsUp !== null && !isNaN(o.pinsUp)) {
          pinsUp = o.pinsUp;
        }
      });
      return pinsUp;
    };
   
   // Logic used to calculate scores
    score = () => {
        let scoreData = [];
        let score = 0;
        let roundIndex = 0;

        const totalPinsNumber = TOTAL_PINS_NUMBER 

        //Create the rounds
        const round1 = () => this.rounds[roundIndex];
        const round2 = () => this.rounds[roundIndex + 1];
        const round3 = () => this.rounds[roundIndex + 2];
        const round4 = () => this.rounds[roundIndex + 3];
        const round5 = () => this.rounds[roundIndex + 4];

        //Calculation of the score and specific actions 
        const sumOfFrameRolls = () => round1() + round2() + round3();

        const isStrike = () => round1() === totalPinsNumber;
        
        const isSpare = () => sumOfFrameRolls() === totalPinsNumber;
        
        const isSpareRound2 = () => round1() + round2() === totalPinsNumber;

        const spareRound2Bonus = () => round3() + round4()
        const spareBonus = () => round4() + round5()
        
        const strikeBonus = () => round2() + round3() + round4();

        //push scores in scoreData 
        /**
         * 
         * @param {number} firstFrameScoreLabel - Score obtained in the first round of the frame
         * @param {number} secondFrameScoreLabel - Score obtained in the second round of the frame
         * @param {number} thirdFrameScoreLabel  - Score obtained in the third round of the frame
         * @param {number} score - score total of the frame
         * @param {number} pinsUp - number of pins still up
         * @param {number} extraFrameScoreLabel - bonus round score in the last frame for a strike or spare
         */
        const saveScore = (firstFrameScoreLabel, secondFrameScoreLabel, thirdFrameScoreLabel, score, pinsUp, extraFrameScoreLabel, extraFrameScoreLabel2) => {
                scoreData.push({
                firstFrameScoreLabel,
                secondFrameScoreLabel,
                thirdFrameScoreLabel,
                matchScore: score,
                pinsUp,
                extraFrameScoreLabel,
                extraFrameScoreLabel2
                });
        };

        //Iteration on frame table
        [...Array(NBR_OF_FRAME)].forEach((_, frameIndex) => {
            //Action when we are on the last frame
            if (frameIndex === 4) {
                if (isStrike()) {
                    score += totalPinsNumber + strikeBonus();
                    let pinsUp
                    if (round2() === undefined) {
                        pinsUp = totalPinsNumber;
                    } else if (round2() !== undefined && round3() === undefined) {
                        pinsUp = totalPinsNumber - ((round1() + round2())% totalPinsNumber);
                    } else if (round2() !== undefined && round3() !== undefined && round4() === undefined) { 
                        pinsUp = totalPinsNumber - ((round2() + round3())% totalPinsNumber);
                    }
                    const roundBonus2 = round2() === 15 ? "X" : round2();
                    const roundBonus3 = round3() === 15 ? "X" : round3();
                    const roundBonus4 = round4() === 15 ? "X" : round4();
                    saveScore("X", roundBonus2, roundBonus3, score, pinsUp, roundBonus4);
                    // saveScore("X", round2(), round3(), score, pinsUp, round4());
                    roundIndex++;
                } else if (isSpareRound2()) {
                    score += totalPinsNumber + spareRound2Bonus();
                    let pinsUp
                    if (round3() === undefined) {
                        pinsUp = totalPinsNumber;
                    } else if (round3() !== undefined && round4() === undefined) {
                        pinsUp = totalPinsNumber - ((round1() + round2() + round3()) % totalPinsNumber);
                    }
                    saveScore(round1(), "/", round3(), score, pinsUp, round4(), round5());
                    roundIndex+=2;
                } else if (isSpare()) {
                    score += totalPinsNumber + spareBonus();
                    const pinsUp = totalPinsNumber
                    saveScore(round1(), round2(), "/", score, pinsUp, round4(), round5())
                    roundIndex += 3
                } else {
                    score += sumOfFrameRolls() + round4();
                    let pinsUp;
                    if (round2() === undefined) { 
                        pinsUp = totalPinsNumber - round1();
                    } else if (round2() !== undefined && round3() === undefined) {
                        pinsUp = totalPinsNumber - (round1() + round2());
                    } else {
                        pinsUp = totalPinsNumber;
                    }
                    saveScore(round1(), round2(), round3(), score, pinsUp);
                    roundIndex += 3;
                }
            //Action for the first to the second last frame
            } else if (isStrike()) {
                score += totalPinsNumber + strikeBonus();
                saveScore("", "", "X", score, totalPinsNumber);
                roundIndex++;
            } else if (isSpareRound2()) {
                score += totalPinsNumber + spareRound2Bonus();
                saveScore(round1(), "/", "", score, totalPinsNumber);
                roundIndex += 2;
            } else if (isSpare()){
                score += totalPinsNumber + spareBonus();
                saveScore(round1(), round2(), "/", score, totalPinsNumber);
                roundIndex += 3;
            } else {
                score += sumOfFrameRolls();
                let pinsUp;
                if (round2() === undefined) { 
                    pinsUp = totalPinsNumber - round1();
                } else if (round2() !== undefined && round3() === undefined) {
                    pinsUp = totalPinsNumber - (round1() + round2());
                } else {
                    pinsUp = totalPinsNumber;
                }
                saveScore(round1(), round2(), round3(), score, pinsUp);
                roundIndex += 3;
            }
        });
        console.log(scoreData);
        return scoreData; 
    };
  }
  
  export default Game;
  