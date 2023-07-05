// import React from 'react'
import './clientStyle.scss';

const SkeletonClientItem = () => {
  return (
    <div className="client_item skeleton-client-item">
      <div className="skeleton skeleton-checkbox"></div>

      <div className="client_details skeleton-details">
        <p className="skeleton skeleton-client-name"></p>
        <p className="skeleton skeleton-client-email"></p>
      </div>
    </div>
  );
};

export default SkeletonClientItem;
