// import React from 'react'
import { UilShare } from '@iconscout/react-unicons';
import getFileThumbNail from '../../../utils/getFileThumbNail';
import PropTypes from 'prop-types';
import './feedStyle.scss';

/**
 * Renders information about the individual files that were fetched
 * @param {*} param0
 * @returns
 */
const FeedItem = ({
  file,
  setFileNames,
  isCheckBoxActive,
  setIsCheckBoxActive,
  fileNames,
}) => {
  const handleCheckBoxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setFileNames([...fileNames, value]);
    } else {
      setFileNames(fileNames.filter((curFileName) => curFileName !== value));
    }
  };

  return (
    <div>
      {isCheckBoxActive && (
        <div style={{ textAlign: 'left' }}>
          <input
            type="checkbox"
            value={file.file_name}
            onChange={handleCheckBoxChange}
            checked={fileNames.includes(file.file_name)}
          />
        </div>
      )}
      <div className="feed_item" key={file.file_id}>
        {getFileThumbNail(file)}
        <div className="file_details">
          <div style={{ textAlign: 'right' }}>
            <UilShare
              size="1.2em"
              color="#5575EA"
              onClick={() => {
                if (fileNames.includes(file.file_name)) return;
                setFileNames([...fileNames, file.file_name]);
                setIsCheckBoxActive(true);
              }}
            />
          </div>
          <h2>{file.title}</h2>
          <button>Download</button>
          <p className="file_description">{file.file_description}</p>
        </div>
      </div>
    </div>
  );
};
FeedItem.propTypes = {
  file: PropTypes.object,
  fileNames: PropTypes.any,
  setFileNames: PropTypes.func,
  setIsCheckBoxActive: PropTypes.func,
  isCheckBoxActive: PropTypes.bool,
};
export default FeedItem;
