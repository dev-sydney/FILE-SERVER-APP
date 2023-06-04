import { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import userReducer from '../reducers/userReducer';

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const intialState = {
    user: JSON.parse(localStorage.getItem('DDS_USER')),
    isLoggedIn: false,
    signUpSuccessMessage: null,
  };

  const [state, dispatch] = useReducer(userReducer, intialState);

  /**
   * Function for making request to the API to log the user into the application
   * @param {Object} formData The Form data
   * @param {Function} navigateTo
   */
  const loginUser = async (formData, navigateTo) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * Function for making request to the API to register a new user into the application
   * @param {*} formData
   */
  const registerUser = async (formData) => {
    try {
      //TODO: Make the request to the API
      const res = await fetch('/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      //TODO: Get the JSON data from the response
      const results = await res.json();
      //TODO: Dispatch to the reducer to set the context state
      dispatch({
        type: 'SIGN_UP',
        payload: results.message,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <userContext.Provider
      value={{
        user: state.user,
        signUpSuccessMessage: state.signUpSuccessMessage,
        loginUser,
        registerUser,
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
