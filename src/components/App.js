import '../styles/App.css';
import Board from './Board'


function App() {

  return (
    <div className="App">
      <header className="App-header">
       <h1>Bowling Score</h1>
      </header>
      <main>
        <Board/>
      </main>
    </div>
  );
}

export default App;
