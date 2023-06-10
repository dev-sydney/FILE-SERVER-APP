import Overview from '../components/overview-board/Overview';
import UsersTable from '../components/users-table/UsersTable';

const Admin = () => {
  return (
    <div>
      <Overview />
      <h2>Users</h2>
      <UsersTable />
    </div>
  );
};

export default Admin;
