import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import getFileIcon from '../../../utils/getFileIcon';
import alertContext from '../../contexts/AlertContext';

const DocsMetaDataTable = ({ user_id, isModalActive }) => {
  const alertContxt = useContext(alertContext);

  const [userFilesData, setUserFilesData] = useState(null);

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
        alertContxt.setAlert(err.message, 'Error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalActive]);

  return (
    <div>
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
