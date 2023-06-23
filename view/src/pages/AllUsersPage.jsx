// import React from 'react'
import UsersTable from '../components/users-table/UsersTable';

const AllUsersPage = () => {
  return (
    <div className="all-users-page">
      <h2 style={{ textAlign: 'left', marginBottom: '1em' }}>All users</h2>
      <UsersTable />
    </div>
  );
};

// AllUsersPage.propTypes = {}

export default AllUsersPage;
