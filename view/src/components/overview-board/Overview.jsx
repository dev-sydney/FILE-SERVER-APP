import { useState, useEffect } from 'react';
import { UilUserCircle } from '@iconscout/react-unicons';
import './overviewStyle.scss';

const Overview = () => {
  const [overviewItems, setOverviewItems] = useState(null);
  const fieldNames = [
    'Businesses',
    'Files shared',
    'Uploaded files',
    'Clients',
  ];

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetch('/api/v1/files/overview')
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          const { overview } = results;
          setOverviewItems(overview[0]);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => setErrorMsg(err.message));
  }, []);

  return (
    <div>
      {errorMsg && <b>{errorMsg}</b>}
      <h2>Overview</h2>
      <div className="overview_item__container">
        {overviewItems &&
          Object.keys(overviewItems).map((el, i) => (
            <div key={i} className="overview_item">
              <UilUserCircle size="2em" color="#5575EA" />
              <p>{overviewItems[el]}</p>
              <p>{fieldNames[i]}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Overview;
