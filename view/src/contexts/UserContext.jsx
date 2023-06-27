import { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import userReducer from '../reducers/userReducer';

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const intialState = {
    user: JSON.parse(localStorage.getItem('DDS_USER')),
    signUpSuccessMessage: null,
    userAlert: null,
    navBarVisibiltyStatus: true,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(userReducer, intialState);

  const clearContextAlerts = (secs = 3000) => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_USER_ALERT',
      });
    }, secs);
  };

  /**
   * Function for making request to the API to log the user into the application
   * @param {Object} formData The Form data
   * @param {Function} navigateTo
   */
  const loginUser = async (formData, navigateTo) => {
    try {
      dispatch({
        type: 'SET_LOADING',
      });

      //TODO: Make the request to the API
      const res = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      //TODO: Get the JSON data from the response
      const results = await res.json();
      if (res.status === 200) {
        //TODO: Dispatch to the reducer to set the context state
        dispatch({
          type: 'SIGN_IN_USER',
          payload: results.user,
        });

        //TODO: Navigate the user to the appropriate page
        setTimeout(() => {
          if (results.user.privilege === 'admin') {
            navigateTo('/admin');
          } else {
            navigateTo('/');
          }
        }, 1000);
      } else {
        throw new Error(results.message);
      }
    } catch (err) {
      dispatch({
        type: 'SIGN_IN_ERROR',
        payload: err.message,
      });
    }
  };
  /**
   * Function for making request to the API to register a new user into the application
   * @param {*} formData
   */
  const registerUser = async (formData) => {
    try {
      dispatch({
        type: 'SET_LOADING',
      });
      //TODO: Make the request to the API
      const res = await fetch('/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        //TODO: Get the JSON data from the response
        const results = await res.json();
        //TODO: Dispatch to the reducer to set the context state
        dispatch({
          type: 'SIGN_UP',
          payload: results.message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * This function basically sets the users data in the context state
   * right after verifying them
   * @param {Object} user The user's data
   */
  const setUserAfterVerification = (user) => {
    dispatch({
      type: 'SET_USER_POST_VERIFICATION',
      payload: user,
    });
  };

  const logout = async (navigateTo) => {
    try {
      const res = await fetch('/api/v1/users/logout');

      if (res.status === 200) {
        dispatch({
          type: 'LOGOUT',
        });

        setTimeout(() => {
          navigateTo('/login', { replace: true });
        }, 500);
        state.user = null;
      }
    } catch (err) {
      dispatch({
        type: 'SIGN_OUT_ERROR',
        payload: 'Trouble signing out right now, please try again.',
      });
      clearContextAlerts();
    }
  };
  const setNavBarVisibilty = (NavBarHiddenValue) => {
    dispatch({
      type: 'SET_NAVBAR_VISIBIITY',
      payload: NavBarHiddenValue,
    });
  };

  return (
    <userContext.Provider
      value={{
        user: state.user,
        signUpSuccessMessage: state.signUpSuccessMessage,
        userALert: state.userALert,
        navBarVisibiltyStatus: state.navBarVisibiltyStatus,
        isLoading: state.isLoading,
        userAlert: state.userAlert,
        loginUser,
        registerUser,
        logout,
        setUserAfterVerification,
        setNavBarVisibilty,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.object,
};

// eslint-disable-next-line react-refresh/only-export-components
export default userContext;
