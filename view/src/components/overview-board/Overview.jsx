import { useState, useEffect, useContext } from 'react';
import {
  UilBuilding,
  UilFileShareAlt,
  UilFileUploadAlt,
  UilUsersAlt,
} from '@iconscout/react-unicons';

import alertContext from '../../contexts/AlertContext';

import './overviewStyle.scss';

const Overview = () => {
  const [overviewItems, setOverviewItems] = useState(null);
  const alertContxt = useContext(alertContext);

  const overviewIcons = [
    // eslint-disable-next-line react/jsx-key
    <UilBuilding size="2em" className="overview-board-icon" />,
    // eslint-disable-next-line react/jsx-key
    <UilFileShareAlt size="2em" className="overview-board-icon" />,
    // eslint-disable-next-line react/jsx-key
    <UilFileUploadAlt size="2em" className="overview-board-icon" />,
    // eslint-disable-next-line react/jsx-key
    <UilUsersAlt size="2em" className="overview-board-icon" />,
  ];

  const fieldNames = [
    'Businesses',
    'Files shared',
    'Uploaded files',
    'Clients',
  ];

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
      .catch((err) =>
        alertContxt.setAlert(err.message, "Hmm, something's wrong!")
      );

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: 'left' }}>Overview</h3>
      <div className="overview_item__container">
        {overviewItems &&
          Object.keys(overviewItems).map((el, i) => (
            <div key={i} className={`overview_item item-${i + 1}`}>
              <span className="flex-1">{overviewIcons[i]}</span>
              <span className="flex-2">
                <b>{overviewItems[el]}</b>
                <p>{fieldNames[i]}</p>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Overview;
