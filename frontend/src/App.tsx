import React from 'react';
import './App.scss';

import Board from './components/board'

function App() {

  return (
    <React.StrictMode>
      <div className="App">
        <Board></Board>
      </div>
    </React.StrictMode>
  );
}

export default App;
