import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';

import './feedStyle.scss';
import alertContext from '../../contexts/AlertContext';

/**
 * Fetches the data about the user files and passes it down to the FeedItems component
 * @param {*} param0
 * @returns
 */
const FeedItemsContainer = ({
  setIsModalActive,
  setFileNames,
  fileNames,
  setIsCheckBoxActive,
  isCheckBoxActive,
}) => {
  const alertContxt = useContext(alertContext);

  const [userFiles, setUserFiles] = useState(null);

  useEffect(() => {
    fetch(
      '/api/v1/files/?fields=title,file_description,file_id,file_type,file_name&file_status=1&sort=created_at:desc'
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setUserFiles(results.files);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Oops, something went wrong')
      );

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {fileNames.length > 0 && (
        <span>
          <button
            onClick={() => {
              setIsModalActive(true);
            }}
          >
            Share
          </button>
          <button
            onClick={() => {
              setFileNames([]);
              setIsCheckBoxActive(false);
            }}
          >
            Cancel
          </button>
        </span>
      )}

      {userFiles &&
        userFiles.map((file) => (
          <FeedItem
            setFileNames={setFileNames}
            file={file}
            key={file.file_id}
            setIsCheckBoxActive={setIsCheckBoxActive}
            isCheckBoxActive={isCheckBoxActive}
            fileNames={fileNames}
          />
        ))}
    </div>
  );
};

FeedItemsContainer.propTypes = {
  fileNames: PropTypes.any,
  isCheckBoxActive: PropTypes.bool,
  setIsCheckBoxActive: PropTypes.func,
  setIsModalActive: PropTypes.func,
  setFileNames: PropTypes.func,
};

export default FeedItemsContainer;
