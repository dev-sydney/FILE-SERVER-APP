import { useContext, useEffect } from 'react';

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
    <div>
      <Overview />
      <h2>Users</h2>
      <UsersTable />
    </div>
  );
};

export default Admin;
