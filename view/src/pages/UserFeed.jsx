import { useState } from 'react';
import FeedItemsContainer from '../components/user-feed/FeedItemsContainer';
import ModalBackground from './../components/modal/ModalBackground';
import ClientListModalWindow from '../components/clients/ClientListModalWindow';

// import Video from '../components/video/Video';

const UserFeed = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);

  return (
    <div>
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
      <h2>For you</h2>
      <FeedItemsContainer
        setFileNames={setFileNames}
        fileNames={fileNames}
        setIsModalActive={setIsModalActive}
        setIsCheckBoxActive={setIsCheckBoxActive}
        isCheckBoxActive={isCheckBoxActive}
      />
    </div>
  );
};

export default UserFeed;
