import axios from 'axios';

export const deleteNote = (noteID, userID) => {
  return async (dispatch) => {
    const {data} = await axios.delete('http://localhost:3333/note', {
      data: {
        userID,
        noteID,
      },
    });

    dispatch({type: 'DELETE_NOTE', payload: data});
  };
};

export const getNotes = (userID) => {
  return async (dispatch) => {
    const {data} = await axios.get('http://localhost:3333/note/all', {
      params: {userID},
    });
    dispatch({type: 'GET_NOTE', payload: data});
  };
};

export const handleSelectedNote = (noteID, userID) => {
  return async (dispatch) => {
    const {data} = await axios.get('http://localhost:3333/note', {
      params: {noteID, userID},
    });
    dispatch({type: 'NOTE_SELECTED', payload: data});
  };
};

export const postNote = (title, userID) => {
  return async (dispatch) => {
    const {data} = await axios.post('http://localhost:3333/note', {
      title,
      userID,
    });
    dispatch({type: 'POST_NOTE', payload: data});
  };
};

export const updateNote = (noteID, userID, title, content) => {
  return async (dispatch) => {
    const {data} = await axios.patch('http://localhost:3333/note', {
      noteID,
      userID,
      title,
      content
    });
    dispatch({type: 'UPDATE_NOTE', payload: data});
  };
};
