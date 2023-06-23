const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SIGN_IN_USER':
      localStorage.removeItem('DDS_USER');
      localStorage.setItem('DDS_USER', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case 'SIGN_UP':
      localStorage.removeItem('DDS_USER');
      //   localStorage.setItem('DDS_USER', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        signUpSuccessMessage: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('DDS_USER');
      return {
        ...state,
      };
    case 'SIGN_OUT_ERROR':
      return {
        ...state,
        userALert: action.payload,
      };
    case 'CLEAR_USER_ALERT':
      return {
        ...state,
        userALert: null,
      };

    case 'SET_USER_POST_VERIFICATION':
      localStorage.removeItem('DDS_USER');
      localStorage.setItem('DDS_USER', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_NAVBAR_VISIBIITY':
      return {
        ...state,
        navBarVisibiltyStatus: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
