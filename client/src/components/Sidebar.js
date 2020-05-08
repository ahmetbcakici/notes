import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {
  deleteNote,
  getNotes,
  handleSelectedNote,
  updateNote,
} from '../redux/actions/note';
import NewNote from './NewNote';

function Sidebar({
  deleteNote,
  getNotes,
  handleSelectedNote,
  notes,
  updateNote,
  user,
}) {
  useEffect(() => {
    getNotes(user._id);
  }, [getNotes, user]);

  return (
    <div>
      {notes && (
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              onClick={() => handleSelectedNote(note._id, user._id)}
            >
              <span>{note.title}</span>&emsp;
              <span
                style={{color: 'red'}}
                onClick={() => deleteNote(note._id, user._id)}
              >
                &times;&times;&times;
              </span>
              <input
                type="text"
                name=""
                id=""
                onKeyUp={({keyCode, target}) => {
                  if (keyCode === 13)
                    updateNote(note._id, user._id, target.value);
                }}
              />
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
