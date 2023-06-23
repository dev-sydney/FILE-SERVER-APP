// import React from 'react'
import { UilShare, UilImport } from '@iconscout/react-unicons';
// import getFileThumbNail from '../../../utils/getFileThumbNail';
import getFileIcon from '../../../utils/getFileIcon';
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
    <div
      style={{
        display: 'flex',
      }}
    >
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
      <div
        className="feed_item"
        key={file.file_id}
        style={{
          background: `${
            fileNames?.includes(file.file_name) ? '#66c46f1c' : ''
          }`,
        }}
      >
        <div style={{ textAlign: 'right' }} className="flex_1">
          <UilShare
            size="1.2em"
            color="#F98746"
            onClick={() => {
              if (fileNames.includes(file.file_name)) return;
              setFileNames([...fileNames, file.file_name]);
              setIsCheckBoxActive(true);
            }}
            style={{ background: '#ffebaa' }}
            className="file_icon"
          />
          <UilImport
            size="1.2em"
            color="#5AAF52"
            className="file_icon"
            style={{ background: '#beffb6' }}
          />
        </div>
        <div className="flex_2">
          <span>{getFileIcon(file)}</span>
        </div>
        <div className="file_details flex_3">
          <h2>{file.title}</h2>
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
