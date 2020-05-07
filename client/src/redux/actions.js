import axios from 'axios';

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(
        'http://localhost:3333/login',
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

export const auth = (token) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:3333/auth', {token});
      dispatch({type: 'AUTH', payload: data.user});
      console.log('try');
    } catch ({response}) {
      const {data /*, status */} = response;
      dispatch({type: 'AUTH', payload: data});
    }
  };
};
