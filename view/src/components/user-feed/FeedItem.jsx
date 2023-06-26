import { useContext } from 'react';
import { UilShare, UilImport } from '@iconscout/react-unicons';
import alertContext from '../../contexts/AlertContext';
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
  setIsPreviewPaneActive,
  setSelectedPreviewFile,
}) => {
  const alertContxt = useContext(alertContext);

  const handleCheckBoxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setFileNames([...fileNames, value]);
    } else {
      setFileNames(fileNames.filter((curFileName) => curFileName !== value));
    }
  };

  const handleOnDownloadClick = () => {
    fetch(
      `/api/v1/files/fileDownloads/${file.file_id}/?file_name=${file.file_name}`,
      {
        method: 'POST',
      }
    )
      .then((res) => res.blob())
      .then((data) => {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(data);
        a.download = file.file_name;
        a.click();
      })
      .catch((err) => alertContxt.setAlert(err.message, 'Error'));
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
            fileNames?.includes(file.file_name) ? '#5b85db17' : ''
          }`,
        }}
      >
        <div style={{ textAlign: 'right' }} className="flex_1">
          <span className="tooltip-icon">
            <span className="tooltipText">Share</span>
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
          </span>
          <span className="tooltip-icon">
            <span className="tooltipText">Download</span>
            <UilImport
              size="1.2em"
              color="#5AAF52"
              className="file_icon"
              style={{ background: '#beffb6' }}
              onClick={handleOnDownloadClick}
            />
          </span>
        </div>
        <div className="flex_2">
          <span
            className="tooltip-icon"
            onClick={() => {
              setSelectedPreviewFile(file);
              setIsPreviewPaneActive(true);
            }}
          >
            <span className="tooltipText">Preview</span>
            {getFileIcon(file)}
          </span>
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
  setSelectedPreviewFile: PropTypes.func,
  setIsPreviewPaneActive: PropTypes.func,
  isCheckBoxActive: PropTypes.bool,
};
export default FeedItem;
