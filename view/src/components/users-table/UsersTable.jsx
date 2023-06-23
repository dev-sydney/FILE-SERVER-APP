import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import './usersTableStyle.scss';
import alertContext from '../../contexts/AlertContext';

const UsersTable = ({ numResults }) => {
  const [users, setUsers] = useState(null);
  const alertContxt = useContext(alertContext);

  useEffect(() => {
    fetch(
      `/api/v1/users/?privilege=business&fields=user_id,user_name,photo,email_address,is_verified&sort=user_name&limit=${
        numResults ? numResults : ''
      }`
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setUsers(results.users);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => {
        alertContxt.setAlert(err.message, 'Error');
      });

    //eslint-disable-next-line
  }, []);

  return (
    <div className="users_table_component">
      <table id="usersTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Organization</th>
            <th>Email</th>
            <th style={{ textAlign: 'left', paddingLeft: '10px' }}>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={user.user_id}>
                <td>{i + 1}</td>
                {/* TD - business profile */}
                <td>
                  <div className="user_td">
                    <img
                      src={`/img/users/${user.photo}`}
                      alt="business profile"
                      style={{
                        minHeight: '4em',
                        maxHeight: '4em',
                        maxWidth: '4em',
                        minWidth: '4em',
                        borderRadius: '10px',
                      }}
                    />
                    <p>
                      <Link to={`/admin/users/${user.user_id}`}>
                        {user.user_name}
                      </Link>
                    </p>
                  </div>
                </td>

                <td>{user.email_address}</td>
                {/* TD - Account status */}
                <td style={{ textAlign: 'center' }}>
                  <p
                    className={`verification-status ${
                      user.is_verified === 1 ? 'verified' : 'unverified'
                    }`}
                  >
                    {user.is_verified === 1 ? 'verified' : 'not verified'}
                  </p>
                </td>
                <td>...</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
UsersTable.propTypes = {
  numResults: PropTypes.number,
};
export default UsersTable;
