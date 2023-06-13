// import React from 'react'
import { UilShare } from '@iconscout/react-unicons';
import getFileThumbNail from '../../../utils/getFileThumbNail';
import PropTypes from 'prop-types';
import './feedStyle.scss';

const FeedItem = ({ file, isModalActive, setIsModalActive }) => {
  return (
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
  );
};
FeedItem.propTypes = {
  file: PropTypes.object,
  isModalActive: PropTypes.bool,
  setIsModalActive: PropTypes.func,
};
export default FeedItem;
