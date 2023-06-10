import { useState } from 'react';
import { useParams } from 'react-router-dom';

import DocsMetaDataTable from '../components/docs-meta-data/DocsMetaDataTable';
import Modalbackground from '../components/modal/ModalBackground';
import UploadDocumentForm from '../components/upload-file-form/UploadDocumentForm';

const UserFIlesPage = () => {
  const { user_id } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div>
      {isModalActive && (
        <Modalbackground
          modalChild={
            <UploadDocumentForm setIsModalActive={setIsModalActive} />
          }
        />
      )}
      <h2>User files</h2>
      <button
        onClick={() => {
          setIsModalActive(!isModalActive);
        }}
      >
        Upoad
      </button>
      {user_id && <DocsMetaDataTable user_id={user_id} />}
    </div>
  );
};

export default UserFIlesPage;
