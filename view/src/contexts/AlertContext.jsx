import { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

import alertReducer from './../reducers/alertReducer';

const alertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const intialState = {
    alertMessage: {
      alertType: 'success',
      message: 'Logged in successfully',
    },
  };
  const [state, dispatch] = useReducer(alertReducer, intialState);

  const clearContextAlerts = (secs = 4000) => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_ALERT',
      });
    }, secs);
  };

  const setAlert = (message, alertType) => {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        alertType,
        message,
      },
    });

    clearContextAlerts();
  };
  const clearAlert = () => {
    dispatch({
      type: 'CLEAR_ALERT',
    });
  };
  return (
    <alertContext.Provider
      value={{
        alertMessage: state.alertMessage,
        setAlert,
        clearAlert,
      }}
    >
      {children}
    </alertContext.Provider>
  );
};

AlertContextProvider.propTypes = {
  children: PropTypes.object,
};

// eslint-disable-next-line react-refresh/only-export-components
export default alertContext;
