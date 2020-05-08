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
    setTTimeout(resetTimeout(timeout, setTimeout(saveValue, 2400)));
    setNoteContent(noteContent);
  };

  const saveValue = () => {
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
        <div id="margin">
          Title: <input id="title" type="text" value={selectedNote.title} readOnly/>
        </div>
        <textarea
          placeholder="Enter something funny."
          id="text"
          name="text"
          value={noteContent}
          onChange={(e) => editValue(e.currentTarget.value)}
          style={{
            overflow: 'hidden',
            wordWrap: 'break-word',
            resize: 'none',
            height: '360px',
          }}
        ></textarea>
        <div style={{display: saved ? '' : 'none'}}>
          <p>Saved Successfully</p>
        </div>

        <br />
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
