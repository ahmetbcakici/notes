import React from 'react';
import { connect } from 'react-redux';

function NoteArea({selectedNote}) {
  return (
    <div>
      <p>{selectedNote.title}</p>
      <textarea cols='30' rows='10'>{selectedNote.content}</textarea>
    </div>
  );
}

const mapStateToProps = state => ({
  selectedNote:state.noteReducer
})

export default connect(mapStateToProps)(NoteArea);
