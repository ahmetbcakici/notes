import axios from 'axios';

export const login = (credentials) => {
  return async (dispatch) => {
    console.log('log actio');
    try {
      const {data} = await axios.post(
        'http://localhost:3333/user/login',
        credentials
      );
      localStorage.setItem('jwt', data.token);
      dispatch({type: 'LOGIN', payload: data.doc});
    } catch ({response}) {
      const {data /*, status */} = response;
      dispatch({type: 'LOGIN', payload: data});
    }
  };
};

export const register = (emailAddress, password, username) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3333/user/register', {
        emailAddress,
        password,
        username,
      });
      dispatch(login({password, username}));
    } catch ({response}) {
      const {data} = response
      dispatch({type: 'LOGIN', payload: data});
    }
  };
};

export const auth = (token) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:3333/user/auth', {
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
    const {data} = await axios.get(`http://localhost:3333/user/${userID}`);
    dispatch({type: 'GET_DATA', payload: data});
  };
};
