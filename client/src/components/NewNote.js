import React, {useState} from 'react';
import {connect} from 'react-redux';

import {postNote} from '../redux/actions/note';

function NewNote({postNote, user}) {
  const [noteName, setNoteName] = useState('');

  return (
    <div>
      <input
        type="text"
        value={noteName}
        onChange={({target}) => setNoteName(target.value)}
      />
      <button onClick={() => postNote(noteName,user._id)}>ADD NEW NOTE</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  postNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
