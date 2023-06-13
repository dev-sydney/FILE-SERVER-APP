import { useState } from 'react';
import FeedItemsContainer from '../components/user-feed/FeedItemsContainer';
import ModalBackground from './../components/modal/ModalBackground';
import Video from '../components/video/Video';

const UserFeed = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <div>
      {isModalActive && (
        <ModalBackground
          modalChild={<Video setIsModalActive={setIsModalActive} />}
        />
      )}
      <h2>For you</h2>
      <FeedItemsContainer
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
    </div>
  );
};

export default UserFeed;
