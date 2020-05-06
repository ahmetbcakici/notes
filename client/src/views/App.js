import React from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NoteArea from '../components/NoteArea';
//import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
    <NoteArea/>
    </div>
  );
}

export default App;
