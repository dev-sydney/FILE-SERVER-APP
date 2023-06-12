import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getFileIcon from '../../../utils/getFileIcon';

const DocsMetaDataTable = ({ user_id, isModalActive }) => {
  const [userFilesData, setUserFilesData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/files/businesses/${user_id}`)
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setUserFilesData(results.businessFiles);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalActive]);

  return (
    <div>
      {errorMessage && errorMessage}
      <table>
        <thead>
          <tr>
            <th>Name ⬆️</th>
            <th>Uploaded on 🕒</th>
            <th>Shares</th>
            <th>Downloads</th>
          </tr>
        </thead>
        <tbody>
          {userFilesData &&
            userFilesData.map((fileData, i) => (
              <tr key={i}>
                <td>
                  {getFileIcon(fileData)}

                  {fileData.title}
                </td>
                <td>{new Date(fileData.created_at).toDateString()}</td>
                <td>{fileData.times_shared}</td>
                <td>
                  {fileData.no_downloads ? fileData.no_downloads : 'none'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
DocsMetaDataTable.propTypes = {
  user_id: PropTypes.string,
  isModalActive: PropTypes.bool,
};
export default DocsMetaDataTable;
