import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';

import './feedStyle.scss';

const FeedItemsContainer = ({ isModalActive, setIsModalActive }) => {
  const [userFiles, setUserFiles] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      .catch((err) => setErrorMessage(err.message));
  }, []);

  return (
    <div>
      {errorMessage && errorMessage}
      {userFiles &&
        userFiles.map((file) => (
          <FeedItem
            file={file}
            key={file.file_id}
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
          />
        ))}
    </div>
  );
};

FeedItemsContainer.propTypes = {
  isModalActive: PropTypes.bool,
  setIsModalActive: PropTypes.func,
};

export default FeedItemsContainer;
