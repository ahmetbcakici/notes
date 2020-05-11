import React from 'react';
import {connect} from 'react-redux';

import {postNote} from '../redux/actions/note';
import plus from '../style/image/icon/plus.png'
import '../style/NewNote.css';

function NewNote({postNote, user}) {
  return (
    <div>
      <button className="postNote" onClick={() => postNote(user._id)}>
        <img src={plus} className="invert" width={20} alt="plus icon"/>
      </button>
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
