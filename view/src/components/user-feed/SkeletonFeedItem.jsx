// import React from 'react'
import './feedStyle.scss';

const SkeletonFeedItem = () => {
  return (
    <div className="feed_item">
      <div style={{ textAlign: 'right' }} className="flex_1">
        <div className="skeleton-icon file_icon skeleton"></div>
        <div className="skeleton-icon file_icon skeleton"></div>
      </div>

      <div className="flex_2">
        <div className="skeleton-icon file_icon skeleton skeleton-file-type"></div>
      </div>

      <div className="file_details flex_3">
        <div className="skeleton-title skeleton"></div>
        <div className="file_description skeleton-file-description skeleton"></div>
        <div className="file_description skeleton-file-description skeleton"></div>
        <div className="file_description skeleton-file-description skeleton"></div>
      </div>
    </div>
  );
};

export default SkeletonFeedItem;
