import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {updateNote} from '../redux/actions/note';
import '../style/NoteArea.css';

const resetTimeout = (id, newID) => {
  clearTimeout(id);
  return newID;
};

function NoteArea({selectedNote, updateNote, user}) {
  const [noteContent, setNoteContent] = useState('');
  const [timeout, setTTimeout] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNoteContent(
      selectedNote.content !== undefined ? selectedNote.content : '' 
    );
  }, [selectedNote]);

  const editValue = (noteContent) => {
    setNoteContent(noteContent);
    setTTimeout(resetTimeout(timeout, setTimeout(() => saveValue(noteContent), 1000)));
  };

  const saveValue = (noteContent) => {
    setSaved(true);
    updateNote(
      selectedNote._id,
      user._id,
      selectedNote.title,
      noteContent
    )
    setTimeout(() => setSaved(false), 1000);
  };

  return (
    <div>
      <div id="wrapper">
        {/* <div id="margin">
          Title: <input id="title" type="text" value={selectedNote.title} readOnly/>
        </div> */}
        <textarea
          placeholder="Enter something funny."
          id="text"
          /* value={`${selectedNote.title}\n\n${noteContent}`} */
          value={noteContent}
          onChange={(e) => editValue(e.currentTarget.value)}
        ></textarea>
        <br/>
        <div style={{display: saved ? '' : 'none',color:'white'}}>
          <p>Saved Successfully</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedNote: state.selectedNoteReducer,
  user: state.userReducer,
});

const mapDispatchToProps = {
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteArea);
