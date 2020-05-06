const initialState = {}

export const userReducer = async (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'LOGIN':
      return {data:payload}
    default:
      return state;
  }
};
