import { useEffect, useState } from 'react';
import {
  UilScenery,
  UilFileAlt,
  UilFilm,
  UilAlignJustify,
  UilFileQuestionAlt,
  //  UilDocumentInfo
} from '@iconscout/react-unicons';
import PropTypes from 'prop-types';

const DocsMetaDataTable = ({ user_id }) => {
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
  }, []);

  const getDocumentIcon = (fileType = String) => {
    switch (fileType) {
      //NOTE:Some Image formats
      case 'jpeg':
        return <UilScenery size="2em" color="#5575EA" />;
      case 'png':
        return <UilScenery size="2em" color="#5575EA" />;
      case 'jpg':
        return <UilScenery size="2em" color="#5575EA" />;
      case 'gif':
        return <UilScenery size="2em" color="#5575EA" />;
      case 'bmp':
        return <UilScenery size="2em" color="#5575EA" />;
      //NOTE: Some video formats
      case 'mp4':
        return <UilFilm size="2em" color="#5575EA" />;
      case 'avi':
        return <UilFilm size="2em" color="#5575EA" />;
      case 'mkv':
        return <UilFilm size="2em" color="#5575EA" />;
      case 'pdf':
        return <UilFileAlt size="2em" color="#5575EA" />;
      case 'txt':
        return <UilAlignJustify size="2em" color="#5575EA" />;
      default:
        return <UilFileQuestionAlt size="2em" color="#5575EA" />;
    }
  };
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
                  {getDocumentIcon(fileData.file_type.toLowerCase())}

                  {fileData.title}
                </td>
                <td>{new Date(fileData.created_at).toDateString()}</td>
                <td>{fileData.no_shares}</td>
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
};
export default DocsMetaDataTable;
