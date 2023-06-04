const userReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN_USER':
      localStorage.removeItem('DDS_USER');
      localStorage.setItem('DDS_USER', JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;