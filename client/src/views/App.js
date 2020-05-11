import React from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NoteArea from '../components/NoteArea';
import '../style/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="notearea">
        <NoteArea />
      </div>
    </div>
  );
}

export default App;
