import { useState, useEffect } from 'react';
import { UilShare } from '@iconscout/react-unicons';
import getFileThumbNail from '../../../utils/getFileThumbNail';
import PropTypes from 'prop-types';

import './feedStyle.scss';

const FeedItems = ({ isModalActive, setIsModalActive }) => {
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
          <div className="feed_item" key={file.file_id}>
            {getFileThumbNail(file, setIsModalActive, isModalActive)}
            <div className="file_details">
              <div style={{ textAlign: 'right' }}>
                <UilShare size="1.2em" color="#5575EA" />
              </div>
              <h2>{file.title}</h2>
              <button>Download</button>
              <p className="file_description">{file.file_description}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

FeedItems.propTypes = {
  isModalActive: PropTypes.bool,
  setIsModalActive: PropTypes.func,
};

export default FeedItems;
