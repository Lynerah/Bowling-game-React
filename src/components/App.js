import '../styles/App.css';
import ScoreBoard from './Board';
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
