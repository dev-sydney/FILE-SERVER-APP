const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alertMessage: action.payload,
      };
    case 'CLEAR_ALERT':
      return {
        ...state,
        alertMessage: null,
      };
    default:
      return state;
  }
};

export default alertReducer;
