import React, {useEffect, useState, useRef} from 'react';
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
  const [editingNote, setEditingNote] = useState('');
  const [hoveringNote, setHoveringNote] = useState('');
  const [currentlySelectedNote, setSelectedCurrentlyNote] = useState('');

  const editNoteInput = useRef(null);

  // show first note in opening
  useEffect(() => {
    if (notes.length > 0 && isOpening) {
      setSelectedCurrentlyNote(notes[0]._id);
      handleSelectedNote(notes[0]._id, user._id);
      setIsOpening(false);
    }
  }, [notes]);

  useEffect(() => {
    getNotes(user._id);
  }, [getNotes, user]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        editNoteInput.current &&
        !editNoteInput.current.contains(event.target)
      ) {
        setEditingNote(null);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editNoteInput]);

  return (
    <div id="sidebar">
      {notes && (
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              onClick={() => {
                handleSelectedNote(note._id, user._id);
                setSelectedCurrentlyNote(note._id);
              }}
              style={{
                background:
                  note._id === currentlySelectedNote
                    ? 'rgba(245, 245, 245, 0.644)'
                    : '',
              }}
              onMouseEnter={() => setHoveringNote(note._id)}
              onMouseLeave={() => setHoveringNote('')}
            >
              {note._id !== editingNote && <span>{note.title}</span>}
              {note._id === editingNote && (
                <input
                  type="text"
                  ref={editNoteInput}
                  placeholder={note.title}
                  onKeyUp={({keyCode, target}) => {
                    if (keyCode === 13) {
                      updateNote(note._id, user._id, target.value);
                      setEditingNote(null);
                    }
                  }}
                />
              )}
              {note._id === hoveringNote && (
                <>
                  {' '}
                  &nbsp;
                  <span onClick={() => setEditingNote(note._id)}>U</span>
                  &nbsp;
                  <span onClick={() => deleteNote(note._id, user._id)}>
                    &times;
                  </span>
                </>
              )}
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
