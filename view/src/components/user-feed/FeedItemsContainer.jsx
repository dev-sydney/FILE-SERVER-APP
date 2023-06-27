import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';
import SkeletonFeedItem from './SkeletonFeedItem';
import { UilUpload } from '@iconscout/react-unicons';

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
  setIsPreviewPaneActive,
  setSelectedPreviewFile,
}) => {
  const alertContxt = useContext(alertContext);

  const [userFiles, setUserFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      '/api/v1/files/?fields=title,file_description,file_id,file_type,file_name,created_at&file_status=1&sort=created_at:desc'
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setUserFiles(results.files);
          setIsLoading(false);
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
    <div className="feed_container">
      <h2 style={{ textAlign: 'left', marginLeft: '0.5em' }}>For You</h2>
      <span style={{ minHeight: '2.6em' }}>
        <span className="share_cancel">
          {fileNames.length > 0 && (
            <button
              onClick={() => {
                setIsModalActive(true);
              }}
              className="share_btn"
            >
              <UilUpload size="1.5em" color="white" />
              <span style={{ marginLeft: '0.4em' }}>Share</span>
            </button>
          )}
          {isCheckBoxActive && (
            <button
              onClick={() => {
                setFileNames([]);
                setIsCheckBoxActive(false);
              }}
              className="cancel-share-btn"
            >
              <span>Cancel</span>
            </button>
          )}
        </span>
      </span>
      {isLoading ? (
        [1, 2, 3, 4, 5, 6].map((el) => <SkeletonFeedItem key={el} />)
      ) : userFiles?.length === 0 ? (
        <p>Sorry , there are no files available for you yet</p>
      ) : (
        userFiles?.map((file) => (
          <FeedItem
            setFileNames={setFileNames}
            file={file}
            key={file.file_id}
            setIsCheckBoxActive={setIsCheckBoxActive}
            isCheckBoxActive={isCheckBoxActive}
            fileNames={fileNames}
            setIsPreviewPaneActive={setIsPreviewPaneActive}
            setSelectedPreviewFile={setSelectedPreviewFile}
          />
        ))
      )}
    </div>
  );
};

FeedItemsContainer.propTypes = {
  fileNames: PropTypes.any,
  isCheckBoxActive: PropTypes.bool,
  setIsCheckBoxActive: PropTypes.func,
  setIsModalActive: PropTypes.func,
  setIsPreviewPaneActive: PropTypes.func,
  setFileNames: PropTypes.func,
  setSelectedPreviewFile: PropTypes.func,
};

export default FeedItemsContainer;
