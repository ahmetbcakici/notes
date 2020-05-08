import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {updateNote} from '../redux/actions/note';

function NoteArea({selectedNote, updateNote, user}) {
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    setNoteContent(
      selectedNote.content === undefined ? '' : selectedNote.content
    );
  }, [selectedNote]);

  return (
    <div>
      <p>{selectedNote.title}</p>
      <textarea
        cols="30"
        rows="10"
        value={noteContent}
        onChange={({target}) => setNoteContent(target.value)}
      ></textarea>
      <button
        onClick={() =>
          updateNote(
            selectedNote._id,
            user._id,
            selectedNote.title,
            noteContent
          )
        }
      >
        SAVE
      </button>
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
