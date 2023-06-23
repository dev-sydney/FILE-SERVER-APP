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
      <div
        style={{
          outline: '1px solid lightblue',
          height: '6em',
          borderRadius: '5px',
          margin: '0.5em 0.5em',
        }}
      ></div>
      <Overview />
      <span style={{ display: 'flex' }}>
        <h2 style={{ textAlign: 'left' }}>Users</h2>
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
