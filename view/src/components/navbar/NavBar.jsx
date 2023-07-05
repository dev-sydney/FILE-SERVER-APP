import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  UilNewspaper,
  UilUsersAlt,
  UilCreateDashboard,
  UilSearch,
  UilSlidersVAlt,
  UilUserCircle,
} from '@iconscout/react-unicons';
import './navStyle.scss';
import userContext from '../../contexts/UserContext';

const NavBar = () => {
  const userContxt = useContext(userContext);

  return (
    <div
      className={`nav__bar ${!userContxt?.user && 'not-loggedin'}`}
      style={{ display: `${!userContxt.navBarVisibiltyStatus ? 'none' : ''}` }}
    >
      <ul>
        {userContxt.user &&
          (['business'].includes(userContxt.user.privilege) ? (
            <li style={{ marginTop: '3em' }}>
              <NavLink to="/">
                <UilNewspaper
                  size="2em"
                  style={{ marginTop: 'auto', marginBottom: 'auto' }}
                />
                <span style={{ marginLeft: '1em', textAlign: 'left' }}>
                  Home
                </span>
              </NavLink>
            </li>
          ) : (
            ''
          ))}

        {/* NOTE: Conditional rendering logic to the link to the explore page */}
        {userContxt.user &&
          (['business'].includes(userContxt.user.privilege) ? (
            <li>
              <NavLink to="/explore">
                <UilSearch
                  size="2em"
                  style={{ marginTop: 'auto', marginBottom: 'auto' }}
                />
                <span style={{ marginLeft: '1em', textAlign: 'left' }}>
                  Search
                </span>
              </NavLink>
            </li>
          ) : (
            ''
          ))}

        {/* NOTE: Conditional rendering logic to the link to the user clients page */}
        {userContxt.user &&
          (['business'].includes(userContxt.user.privilege) ? (
            <li>
              <NavLink to="/user-clients">
                <UilUsersAlt
                  size="2em"
                  style={{ marginTop: 'auto', marginBottom: 'auto' }}
                />
                <span style={{ marginLeft: '1em' }}>Clients</span>
              </NavLink>
            </li>
          ) : (
            ''
          ))}
        {/* NOTE: Conditional rendering logic to the link to the admin dashboard page */}
        {userContxt.user &&
          (['admin'].includes(userContxt.user.privilege) ? (
            <li>
              <NavLink to="/admin">
                <UilCreateDashboard
                  size="2em"
                  style={{ marginTop: 'auto', marginBottom: 'auto' }}
                />
                <span>Dashboard</span>
              </NavLink>
            </li>
          ) : (
            ''
          ))}
        {/* NOTE: Conditional rendering logic to the link to the feed page */}

        {/* NOTE: Conditional rendering logic to the link to the account overview page */}
        {userContxt.user &&
          (['admin', 'business'].includes(userContxt.user.privilege) ? (
            <li style={{ marginTop: 'auto' }}>
              <NavLink to="/account/overview">
                <UilUserCircle
                  size="2em"
                  style={{ marginTop: 'auto', marginBottom: 'auto' }}
                />
                <span style={{ marginLeft: '1em' }}>Account</span>
              </NavLink>
            </li>
          ) : (
            ''
          ))}
        {/* NOTE: Conditional rendering logic to the link to the account overview page */}
        {userContxt.user &&
          (['admin', 'business'].includes(userContxt.user.privilege) ? (
            <li>
              <NavLink to="/account/profile">
                <UilSlidersVAlt
                  size="2em"
                  style={{ marginTop: 'auto', marginBottom: 'auto' }}
                />
                <span style={{ marginLeft: '1em' }}>Settings</span>
              </NavLink>
            </li>
          ) : (
            ''
          ))}
      </ul>
    </div>
  );
};

export default NavBar;
