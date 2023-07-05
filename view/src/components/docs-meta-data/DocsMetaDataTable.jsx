import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import getFileIcon from '../../../utils/getFileIcon';
import alertContext from '../../contexts/AlertContext';
import { UilSpinner } from '@iconscout/react-unicons';

import {
  UilArrowUp,
  UilClockThree,
  UilShare,
  UilImport,
} from '@iconscout/react-unicons';
const DocsMetaDataTable = ({ user_id, isModalActive }) => {
  const alertContxt = useContext(alertContext);

  const [userFilesData, setUserFilesData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(`/api/v1/files/businesses/${user_id}`)
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setUserFilesData(results.businessFiles);
          setIsLoading(false);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => {
        alertContxt.setAlert(err.message, 'Error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalActive]);

  const iconStyle = { margin: 'auto 0' };
  const thLabel = { margin: 'auto 0.5em' };
  return (
    <div>
      {isLoading ? (
        <UilSpinner
          size="2.5em"
          color="#121927"
          className="spinner-icon"
          style={{ margin: '0 auto' }}
        />
      ) : userFilesData?.length === 0 ? (
        <p>No files uploaded for this user yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span style={{ display: 'flex' }}>
                  <span style={thLabel}>File name</span>
                  <span style={iconStyle}>
                    <UilArrowUp color="#121927" size="1.5em" />
                  </span>
                </span>
              </th>
              <th>
                <span style={{ display: 'flex' }}>
                  <span style={thLabel}>Uploaded on</span>
                  <span style={iconStyle}>
                    <UilClockThree color="#121927" size="1.5em" />
                  </span>
                </span>
              </th>
              <th>
                <span style={{ display: 'flex' }}>
                  <span style={thLabel}>Shares</span>
                  <span style={iconStyle}>
                    <UilShare color="#121927" size="1.5em" />
                  </span>
                </span>
              </th>
              <th>
                <span style={{ display: 'flex' }}>
                  <span style={thLabel}>Downloads</span>
                  <span style={iconStyle}>
                    <UilImport color="#121927" size="1.5em" />
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {userFilesData?.map((fileData, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <span className="file-name-icon">
                    {getFileIcon(fileData)}
                    <p style={{ margin: 'auto 0.5em' }}>{fileData.title}</p>
                  </span>
                </td>
                <td style={{ textAlign: 'left' }}>
                  {new Date(fileData.created_at).toDateString()}
                </td>
                <td>{fileData.times_shared}</td>
                <td>
                  {fileData.no_downloads ? fileData.no_downloads : 'none'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
DocsMetaDataTable.propTypes = {
  user_id: PropTypes.string,
  isModalActive: PropTypes.bool,
};
export default DocsMetaDataTable;
