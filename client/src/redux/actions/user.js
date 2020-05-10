import axios from 'axios';

import {API_URL} from '../../config';

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });
      localStorage.setItem('jwt', data.token);
      dispatch({type: 'LOGIN', payload: data.doc});
    } catch ({response}) {
      const {data /*, status */} = response;
      dispatch({type: 'LOGIN', payload: data});
    }
  };
};

export const register = (emailAddress, password, username) => {
  // ABC_NOTE : PLEASE DO NOT REGISTER USER WITHOUT MAIL VERIFICATION!!!
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`${API_URL}/user/register`, {
        emailAddress,
        password,
        username,
      });
      localStorage.setItem('email_code', data);
      // dispatch(login({password, username}));
    } catch ({response}) {
      const {data} = response;
      dispatch({type: 'LOGIN', payload: data});
    }
  };
};

export const confirmEmail = (confirmCode, token) => (dispatch) =>
  new Promise(async (resolve) => {
    try {
      const {data} = await axios.post(`${API_URL}/user/confirmEmail`, {
        confirmCode,
        token,
      });

      return resolve(data);
    } catch (err) {
      console.log(err);
      //const {data} = response;
      const data = err.response.data;
      dispatch({type: 'LOGIN', payload: data});
    }
  });

export const auth = (token) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`${API_URL}/user/auth`, {
        token,
      });
      dispatch({type: 'AUTH', payload: data});
    } catch ({response}) {
      const {data /*, status */} = response;
      dispatch({type: 'AUTH', payload: data});
    }
  };
};

export const getData = (userID) => {
  return async (dispatch) => {
    const {data} = await axios.get(`${API_URL}/user/${userID}`);
    dispatch({type: 'GET_DATA', payload: data});
  };
};
