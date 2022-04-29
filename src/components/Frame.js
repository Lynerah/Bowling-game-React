//Frame constructions
const Frame = ({ frameTitle, firstFrameScoreLabel, secondFrameScoreLabel, thirdFrameScoreLabel, extraFrameScoreLabel, extraFrameScoreLabel2, score }) => (
   <div className="frame">
     <div className="frame_title">{frameTitle}</div>
     <div className="frame-score">
       <div className="box firstFrameScoreLabel">{firstFrameScoreLabel}</div>
       <div className="box secondFrameScoreLabel">{secondFrameScoreLabel}</div>
       <div className="box thirdFrameScoreLabel">{thirdFrameScoreLabel}</div>
       <div className="box extra">{extraFrameScoreLabel}</div>
       <div className="box extra">{extraFrameScoreLabel2}</div>
     </div>
     <div className="running-score">{!isNaN(score) && score}</div>
   </div>
 );

 export default Frame;