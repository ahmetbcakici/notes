import axios from 'axios'

export const login = (credentials) => {
  return async (dispatch) => {
    const {data} = await axios.post('http://localhost:3333/login',credentials)
    
    dispatch({type: 'LOGIN', payload: data});
  };
};
