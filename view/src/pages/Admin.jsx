import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Overview from '../components/overview-board/Overview';
import UsersTable from '../components/users-table/UsersTable';

import userContext from '../contexts/UserContext';

const Admin = () => {
  const userContxt = useContext(userContext);

  useEffect(() => {
    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="admin-page">
      <div className="welcome-user-card">
        <span style={{ textAlign: 'left', margin: 'auto 2%' }}>
          <h1>Hey there, Admin</h1>
          <p>Ready to start your day with a brief over sight?</p>
        </span>
        <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <img
            src="/img/hello-admin-removebg-preview.png"
            style={{ height: '10em' }}
          />
        </span>
      </div>
      <Overview />
      <span style={{ display: 'flex' }}>
        <h3 style={{ textAlign: 'left' }}>Users</h3>
        <Link
          to="/admin/users"
          style={{ marginLeft: 'auto', marginRight: '0.5em' }}
        >
          Show all
        </Link>
      </span>
      <UsersTable numResults={5} />
    </div>
  );
};

export default Admin;
