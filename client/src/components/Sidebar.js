import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {getData,handleSelectedNote} from '../redux/actions';
import NewNote from './NewNote';

function Sidebar({getData,handleSelectedNote, user}) {
  const [noteName, setNoteName] = useState('');

  const deleteNote = async (noteID) => {
    await axios.delete('http://localhost:3333/note', {
      data: {
        userID: user._id,
        noteID,
      },
    });
    getData(user._id);
  };

  const updateNote = async (noteID) => {
    await axios.patch('http://localhost:3333/note', {
      userID: user._id,
      noteID,
      title: noteName,
    });
    getData(user._id);
  };

  return (
    <div>
      {user.notes && (
        <ul>
          {user.notes.map((note) => (
            <li key={note._id} onClick={() => handleSelectedNote(note._id,user._id)}>
              <span>{note.title}</span>&emsp;
              <span style={{color: 'red'}} onClick={() => deleteNote(note._id)}>
                &times;&times;&times;
              </span>
              <input
                type="text"
                name=""
                id=""
                onKeyUp={({keyCode, target}) => {
                  setNoteName(target.value);
                  if (keyCode === 13) updateNote(note._id);
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
  user: state.userReducer,
});

const mapDispatchToProps = {
  getData,
  handleSelectedNote
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
