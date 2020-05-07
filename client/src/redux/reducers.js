const initialState = {};

export const userReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'LOGIN':
      return payload;
    case 'AUTH':
      return payload;
    case 'GET_DATA':
      return payload;
    default:
      return state;
  }
};

export const noteReducer = (state = {title:'Select a note'}, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'NOTE_SELECTED':
      return payload;
    default:
      return state;
  }
};
