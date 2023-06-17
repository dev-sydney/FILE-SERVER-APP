import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import userContext from '../../contexts/UserContext';
import PropTypes from 'prop-types';

const RequireAuthentication = ({ child }) => {
  const userContxt = useContext(userContext);
  if (!userContxt?.user) return <Navigate to={'/login'} />;
  return child;
};

RequireAuthentication.propTypes = {
  child: PropTypes.any,
};
export default RequireAuthentication;
