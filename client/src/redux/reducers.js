const initialState = {};

export const userReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'LOGIN':
      return payload;
    case 'AUTH':
      return payload;
    default:
      return state;
  }
};