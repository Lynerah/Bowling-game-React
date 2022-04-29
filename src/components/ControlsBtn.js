//Construction of the buttons to indicate the number of pins dropped and the reset button of the game
const Controls = ({ handleRoll, handleReset, pinsUp }) => (
   <div className="header_controls"> 
     <div className="header_controls-left">
       {[...Array(pinsUp + 1)].map((o, i) => (
         <button key={i} className="score " onClick={() => handleRoll(i)}>
           {i}
         </button>
       ))}
     </div>
     <div className="header_controls-right">
       <div className="score reset" onClick={() => handleReset()}> 
         Reset Game
       </div>
     </div>
   </div>
 );

 export default Controls;