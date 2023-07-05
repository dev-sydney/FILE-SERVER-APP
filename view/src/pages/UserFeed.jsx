import { useState, useEffect, useContext } from 'react';
import FeedItemsContainer from '../components/user-feed/FeedItemsContainer';
import ModalBackground from './../components/modal/ModalBackground';
import ClientListModalWindow from '../components/clients/ClientListModalWindow';
import FilePreviewPane from '../components/file-preview/FilePreviewPane';

import userContext from '../contexts/UserContext';

// import Video from '../components/video/Video';

const UserFeed = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);
  const userContxt = useContext(userContext);
  const [isPreviewPaneActive, setIsPreviewPaneActive] = useState(false);

  const [selectedPreviewFile, setSelectedPreviewFile] = useState(null);

  useEffect(() => {
    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
  }, []);

  return (
    <div
      className="feed-page"
      style={{
        background: '#F6F7FB',
      }}
    >
      {isModalActive && (
        <ModalBackground
          modalChild={
            <ClientListModalWindow
              setIsModalActive={setIsModalActive}
              fileNames={fileNames.join(',')}
              setFileNames={setFileNames}
              setIsCheckBoxActive={setIsCheckBoxActive}
            />
          }
        />
      )}
      {/* <h2 style={{ textAlign: 'left', width: 'fit-content', margin: '0 auto' }}>
        For you
      </h2> */}
      <FeedItemsContainer
        setFileNames={setFileNames}
        fileNames={fileNames}
        setIsModalActive={setIsModalActive}
        setIsCheckBoxActive={setIsCheckBoxActive}
        isCheckBoxActive={isCheckBoxActive}
        setIsPreviewPaneActive={setIsPreviewPaneActive}
        setSelectedPreviewFile={setSelectedPreviewFile}
      />

      <FilePreviewPane
        isPreviewPaneActive={isPreviewPaneActive}
        setIsPreviewPaneActive={setIsPreviewPaneActive}
        file={selectedPreviewFile}
        setSelectedPreviewFile={setSelectedPreviewFile}
      />
    </div>
  );
};

export default UserFeed;
