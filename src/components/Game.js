const NBR_OF_QUILLES = 15;
const NBR_OF_FRAME = 5;
class Game {
    constructor() {
      this.rounds = [];
      this.currentRoll = 0;
    }
  
    static create = () => new Game();
  
//quille par tour
    round = pins => (this.rounds[this.currentRoll++] = pins);
  

//control btn reset
    reset = () => {
      this.rounds = [];
      this.currentRoll = 0;
    };

//nombre de quilles encore debout 
    getPinsUp = () => {
      const scoreData = this.score();
      let nbrOfQuilles = NBR_OF_QUILLES 
      let pinsUp = nbrOfQuilles;
      scoreData.forEach(o => {
        if (o.pinsUp !== null && !isNaN(o.pinsUp)) {
          pinsUp = o.pinsUp;
        }
      });
      return pinsUp;
    };
  
    score = () => {
        let scoreData = [];
        let score = 0;
        let roundIndex = 0;

        const nbrOfQuilles = NBR_OF_QUILLES 

        //methode de calcule des scores
        const round1 = () => this.rounds[roundIndex];
        const round2 = () => this.rounds[roundIndex + 1];
        const round3 = () => this.rounds[roundIndex + 2];
        const round4 = () => this.rounds[roundIndex + 3];
        const round5 = () => this.rounds[roundIndex + 4];

        const sumOfFrameRolls = () => round1() + round2() + round3();

        const isStrike = () => round1() === nbrOfQuilles;
        
        const isSpare = () => sumOfFrameRolls() === nbrOfQuilles;
        
        const isSpareRound2 = () => round1() + round2() === nbrOfQuilles;
        
        const spareBonus = () => {
            if(isSpareRound2) {
              return round3() + round4()
            }
            return round4() + round5()
        };
        
        const strikeBonus = () => round2() + round3() + round4();

        //push les scores dans le tableau scoreData + adaptation des symbole en fonction de l'action
        const saveScore = (scoreData, leftBox, midBox, rightBox, score, pinsUp) => {
            if (scoreData.length < NBR_OF_FRAME) {
                console.log(scoreData.length)
                scoreData.push({
                leftBox,
                midBox,
                rightBox,
                cumulativeScore: score,
                pinsUp
                });
            } else {
                const box1 = isStrike() ? "X" : round1();
                const box2 = isSpareRound2() ? "/" : round2();
                const box3 = isSpare() ? "/" : round3();

                let box4;
                if (round4() === nbrOfQuilles) {
                    box4 = "X";
                } else if (isStrike() || isSpareRound2() || isSpare())  {
                    box4 = round4();
                } else {
                    box4 = "";
                }
                console.log("test", round1(), round2(), round3(), round4())
                scoreData.push({
                    leftBox: box1,
                    midBox : box2,
                    rightBox: box3,
                    cumulativeScore: score,
                    pinsUp,
                    extraBox: box4
                });
            }
        };

        [...Array(NBR_OF_FRAME)].forEach((_, frameIndex) => {
            if (frameIndex === 4) {
                if (isStrike()) {
                    score += nbrOfQuilles + strikeBonus();
                    saveScore(scoreData, "X", round2(), round3(), score, nbrOfQuilles);
                    roundIndex++;
                } else if (isSpareRound2()) {
                    score += nbrOfQuilles + spareBonus();
                    saveScore(scoreData, round1(), "/", round3(), score, nbrOfQuilles);
                    roundIndex+=2;
                } else if (isSpare()) {
                    score += nbrOfQuilles + spareBonus();
                    saveScore(scoreData, round1(), round2(), "/", score, nbrOfQuilles)
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
                    saveScore(scoreData, round1(), round2(), round3(), score, pinsUp);
                }

            } else if (isStrike()) {
                score += nbrOfQuilles + strikeBonus();
                saveScore(scoreData, "", "", "X", score, nbrOfQuilles);
                roundIndex++;
            } else if (isSpareRound2()) {
                score += nbrOfQuilles + spareBonus();
                saveScore(scoreData, round1(), "/", "", score, nbrOfQuilles);
                roundIndex += 2;
            } else if (isSpare()){
                score += nbrOfQuilles + spareBonus();
                saveScore(scoreData, round1(), round2(), "/", score, nbrOfQuilles);
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
                saveScore(scoreData, round1(), round2(), round3(), score, pinsUp);
                roundIndex += 3;
            }
        });

        return scoreData;
    };
  }
  
  export default Game;
  