import { useState } from 'react';
import { useParams } from 'react-router-dom';

import DocsMetaDataTable from '../components/docs-meta-data/DocsMetaDataTable';
import Modalbackground from '../components/modal/ModalBackground';
import UploadDocumentForm from '../components/upload-file-form/UploadDocumentForm';

import { UilFileUpload } from '@iconscout/react-unicons';

/**
 * This is the page component from which the admin will be able upload new files/documents for a business,
 * as well viewing the stats of all the files belonging to the business (no of downloads & shares)
 * @returns
 */
const UserFIlesPage = () => {
  const { user_id } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  const uploadButtonStyle = {
    fontSize: '.8em',
    padding: '0.5em 1em',
    borderRadius: '5px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex',
    cursor: 'pointer',
    background: '#121927',
    color: 'white',
    outline: 'none',
    border: 'none',
  };
  return (
    <div className="users-files-page">
      {isModalActive && (
        <Modalbackground
          modalChild={
            <UploadDocumentForm setIsModalActive={setIsModalActive} />
          }
        />
      )}
      <h2 style={{ textAlign: 'left' }}>User files</h2>
      <span
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1em 0.5em',
        }}
      >
        <button
          style={uploadButtonStyle}
          onClick={() => {
            setIsModalActive(!isModalActive);
          }}
        >
          <span style={{ margin: 'auto 0' }}>Upload</span>
          <span>
            <UilFileUpload size="1.5em" />
          </span>
        </button>
      </span>
      {user_id && (
        <DocsMetaDataTable user_id={user_id} isModalActive={isModalActive} />
      )}
    </div>
  );
};

export default UserFIlesPage;
