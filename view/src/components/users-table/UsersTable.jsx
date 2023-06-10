import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './usersTableStyle.scss';

const UsersTable = () => {
  const [users, setUsers] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(
      '/api/v1/users/?privilege=business&fields=user_id,user_name,photo,email_address,is_verified&sort=user_name'
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          console.log(results.users);
          setUsers(results.users);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, []);

  return (
    <div className="users_table_component">
      {errorMessage && errorMessage}
      <table id="usersTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
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
                      <Link to={`/users/${user.user_id}`}>
                        {user.user_name}
                      </Link>
                    </p>
                  </div>
                </td>

                <td>{user.email_address}</td>
                {/* TD - Account status */}
                <td>{user.is_verified === 1 ? 'verified' : 'not verified'}</td>
                <td>...</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
