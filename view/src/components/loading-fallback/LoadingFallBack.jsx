// import React from 'react'
import { UilSpinner } from '@iconscout/react-unicons';

const LoadingFallBack = () => {
  const style = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  };

  return (
    <div style={style}>
      <span>
        <UilSpinner size="1.4em" className="spinner-icon" />
      </span>
    </div>
  );
};

export default LoadingFallBack;
