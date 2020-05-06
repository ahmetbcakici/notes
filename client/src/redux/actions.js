import axios from 'axios';

export const login = (credentials) => {
  return async (dispatch) => {
    const {data} = await axios.post('http://localhost:3333/login', credentials);
    localStorage.setItem('jwt', data.token);
    dispatch({type: 'LOGIN', payload: data.doc});
  };
};

export const auth = (token) => {
  return async (dispatch) => {
    const {data} = await axios.post('http://localhost:3333/auth', {token});
    
    dispatch({type: 'AUTH', payload: data.user});
  };
};
