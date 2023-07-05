import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import userContext from '../../contexts/UserContext';
import PropTypes from 'prop-types';

const RequireAuthorization = ({ authorizedRoles = [], child, route }) => {
  const userContxt = useContext(userContext);
  if (!authorizedRoles.includes(userContxt?.user?.privilege))
    return <Navigate to={route} />;
  return child;
};
RequireAuthorization.propTypes = {
  authorizedRoles: PropTypes.array,
  child: PropTypes.element,
  route: PropTypes.string,
};
export default RequireAuthorization;
