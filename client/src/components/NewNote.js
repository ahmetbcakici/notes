import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {getData} from '../redux/actions';

function NewNote({getData, user}) {
  const [noteName, setNoteName] = useState('');

  const postNote = async () => {
    await axios.post('http://localhost:3333/note', {
      userID: user._id,
      title: noteName,
    });
    getData(user._id);
  };

  return (
    <div>
      <input
        type="text"
        value={noteName}
        onChange={({target}) => setNoteName(target.value)}
      />
      <button onClick={postNote}>ADD NEW NOTE</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
