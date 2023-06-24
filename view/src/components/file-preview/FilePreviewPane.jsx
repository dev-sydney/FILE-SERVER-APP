import { UilTimes } from '@iconscout/react-unicons';

import GetFileThumbNail from '../../../utils/getFileThumbNail';
import getFileIcon from '../../../utils/getFileIcon';

import PropTypes from 'prop-types';

import './previewStyle.scss';
const FilePreviewPane = ({
  isPreviewPaneActive,
  setIsPreviewPaneActive,
  setSelectedPreviewFile,
  file,
}) => {
  return (
    <div
      className={`file-preview-pane ${
        isPreviewPaneActive ? 'show-pane' : 'hide-pane'
      }`}
    >
      <div style={{ display: 'flex' }} className="preview-pane__close">
        <h3 style={{ marginRight: 'auto' }}>File preview</h3>
        <UilTimes
          className="close-modal-btn"
          size="1.5em"
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            setIsPreviewPaneActive(false);
            setSelectedPreviewFile(false);
          }}
        />
      </div>
      {/* NOTE: Preview Thumbnail */}
      <div className="preview-pane__thumbnail">
        {file && GetFileThumbNail(file)}
      </div>

      {/* NOTE: File icon & file name */}
      <div style={{ display: 'flex' }} className="preview-pane__filename">
        {file && getFileIcon(file)}
        <p style={{ margin: 'auto 1.5em', fontWeight: 600 }}>
          {file?.file_name}
        </p>
      </div>
      {/* NOTE: File description */}
      <div className="preview-pane__description">
        <h3>Description</h3>
        <p>{file?.file_description}</p>
      </div>

      <div style={{ marginTop: 'auto' }} className="preview-pane__properties">
        <h3>Properties</h3>

        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: 'auto', color: 'gray' }}>Type</span>
          <span style={{ marginRight: 'auto', fontWeight: 700 }}>
            {file?.file_type?.split('/')[1].toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: 'auto', color: 'gray' }}>
            Uploaded on
          </span>
          <span style={{ marginRight: 'auto', fontWeight: 700 }}>
            {new Date(file?.created_at).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

FilePreviewPane.propTypes = {
  isPreviewPaneActive: PropTypes.bool,
  setIsPreviewPaneActive: PropTypes.func,
  setSelectedPreviewFile: PropTypes.func,
  file: PropTypes.any,
};
export default FilePreviewPane;
