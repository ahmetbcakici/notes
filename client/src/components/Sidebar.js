import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {
  deleteNote,
  getNotes,
  handleSelectedNote,
  updateNote,
} from '../redux/actions/note';
import NewNote from './NewNote';
import '../style/Sidebar.css';

function Sidebar({
  deleteNote,
  getNotes,
  handleSelectedNote,
  notes,
  updateNote,
  user,
}) {
  const [isOpening, setIsOpening] = useState(true);
  const [isTitleEditing, setIsTitleEditing] = useState('');

  // show first note in opening
  useEffect(() => {
    if (notes.length > 0 && isOpening) {
      handleSelectedNote(notes[0]._id, user._id);
      setIsOpening(false);
    }
  }, [notes]);

  useEffect(() => {
    getNotes(user._id);
  }, [getNotes, user]);

  return (
    <div id="sidebar">
      {notes && (
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              onClick={() => handleSelectedNote(note._id, user._id)}
            >
              {!isTitleEditing && <span>{note.title}</span>}
              {isTitleEditing && (
                <input
                  type="text"
                  placeholder={note.title}
                  onKeyUp={({keyCode, target}) => {
                    //setNewTitle(target.value);
                    if (keyCode === 13){
                      updateNote(note._id, user._id, target.value);
                      setIsTitleEditing(false)
                    }
                  }}
                />
              )}
              &nbsp;
              <span onClick={() => setIsTitleEditing(true)}>U</span>
              &nbsp;
              <span onClick={() => deleteNote(note._id, user._id)}>
                &times;
              </span>
            </li>
          ))}
        </ul>
      )}
      <NewNote />
    </div>
  );
}

const mapStateToProps = (state) => ({
  notes: state.noteReducer,
  selectedNote: state.selectedNoteReducer,
  user: state.userReducer,
});

const mapDispatchToProps = {
  deleteNote,
  getNotes,
  handleSelectedNote,
  updateNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
