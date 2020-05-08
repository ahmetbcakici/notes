import React from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NoteArea from '../components/NoteArea';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <br />
      About Note
      <hr />
      <NoteArea />
    </div>
  );
}

export default App;
