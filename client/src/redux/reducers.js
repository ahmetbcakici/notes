const initialState = [];
/* const initialState = [{a: 1}, {b: 2}]; */

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

export const noteReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'DELETE_NOTE':
      return payload;
    case 'GET_NOTE':
      return payload;
    case 'POST_NOTE':
      return payload;
    case 'UPDATE_NOTE':
      return payload;
    default:
      return state;
  }
};

export const selectedNoteReducer = (
  state = {title: 'Select a note'},
  action
) => {
  const {type, payload} = action;
  switch (type) {
    case 'NOTE_SELECTED':
      return payload;
    default:
      return state;
  }
};
