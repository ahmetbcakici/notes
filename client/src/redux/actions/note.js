import axios from 'axios';

import {API_URL} from '../../config'

export const deleteNote = (noteID, userID) => {
  return async (dispatch) => {
    const {data} = await axios.delete(`${API_URL}/note`, {
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
    const {data} = await axios.get(`${API_URL}/note/all`, {
      params: {userID},
    });
    dispatch({type: 'GET_NOTE', payload: data});
  };
};

export const handleSelectedNote = (noteID, userID) => {
  return async (dispatch) => {
    const {data} = await axios.get(`${API_URL}/note`, {
      params: {noteID, userID},
    });
    dispatch({type: 'NOTE_SELECTED', payload: data});
  };
};

export const postNote = (userID) => {
  return async (dispatch) => {
    const {data} = await axios.post(`${API_URL}/note`, {
      userID,
    });
    dispatch({type: 'POST_NOTE', payload: data});
  };
};

export const updateNote = (noteID, userID, title, content) => {
  return async (dispatch) => {
    const {data} = await axios.patch(`${API_URL}/note`, {
      noteID,
      userID,
      title,
      content,
    });
    dispatch({type: 'UPDATE_NOTE', payload: data});
  };
};
