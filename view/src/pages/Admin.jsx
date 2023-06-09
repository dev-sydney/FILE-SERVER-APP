import { useState } from 'react';
import Overview from '../components/overview-board/Overview';

const Admin = () => {
  // const [businessess, setBusinesses] = useState(null);

  const [errorMsg] = useState('');

  // useEffect(() => {
  //   fetch('/api/v1/users/')
  //     .then((res) => res.json())
  //     .then((results) => {
  //       if (results.status === 'success') {
  //         setBusinesses(results.users);
  //       } else {
  //         throw new Error(results.message);
  //       }
  //     })
  //     .catch((err) => setErrorMsg(err.message));
  // }, []);

  return (
    <div>
      {errorMsg !== '' && errorMsg}
      <Overview />
    </div>
  );
};

export default Admin;
