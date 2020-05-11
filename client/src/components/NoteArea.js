import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {updateNote} from '../redux/actions/note';
import Toastr from './Toastr';
import '../style/NoteArea.css';

const resetTimeout = (id, newID) => {
  clearTimeout(id);
  return newID;
};

function NoteArea({selectedNote, updateNote, user}) {
  const [noteContent, setNoteContent] = useState('');
  const [showToastr, setShowToastr] = useState('');
  const [timeout, setTTimeout] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNoteContent(
      selectedNote.content !== undefined ? selectedNote.content : ''
    );
  }, [selectedNote]);

  const editValue = (noteContent) => {
    setNoteContent(noteContent);
    setTTimeout(
      resetTimeout(
        timeout,
        setTimeout(() => saveValue(noteContent), 1000)
      )
    );
  };

  const saveValue = (noteContent) => {
    setSaved(true);
    setShowToastr(true);
    updateNote(selectedNote._id, user._id, null, noteContent);
    setTimeout(() => {
      setSaved(false);
      setShowToastr(false);
    }, 1000);
  };

  return (
    <div>
      <Toastr
        title="Auto-Saving"
        color="info"
        position="top-right"
        visibility={showToastr}
      ></Toastr>
      <textarea
        id="text"
        value={noteContent}
        onChange={(e) => editValue(e.currentTarget.value)}
      ></textarea>
      <br />
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
