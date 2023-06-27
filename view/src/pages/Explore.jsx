import { useState, useEffect, useContext } from 'react';
import FeedItem from '../components/user-feed/FeedItem';
import userContext from '../contexts/UserContext';
import { UilSearch, UilUpload } from '@iconscout/react-unicons';
import ModalBackground from '../components/modal/ModalBackground';
import ClientListModalWindow from '../components/clients/ClientListModalWindow';
import FilePreviewPane from '../components/file-preview/FilePreviewPane';

/**
 *
 * @returns The Explore Page Component for searching for files
 */
const Explore = () => {
  const [searchField, setSearchField] = useState('title');
  const [searchResults, setSearchResults] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState('');

  const [isModalActive, setIsModalActive] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [isCheckBoxActive, setIsCheckBoxActive] = useState(false);

  const [isPreviewPaneActive, setIsPreviewPaneActive] = useState(false);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState(null);

  const userContxt = useContext(userContext);

  useEffect(() => {
    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (e.target.value !== '') {
        fetch(
          `/api/v1/files/search/?fields=title,file_description,file_id,file_type,file_name&searchField=${searchField}`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ searchVal: e.target.value }),
          }
        )
          .then((res) => res.json())
          .then((results) => setSearchResults(results.searchResults));
      } else {
        setSearchResults([]);
      }
    }, 800);

    setTypingTimeout(timeout);
  };
  return (
    <div className="explore-page">
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

      <div className="feed_container">
        <span style={{ display: 'flex', margin: '0 auto', padding: '1em' }}>
          <form className="search-form">
            <span>
              <UilSearch
                color="#9A9A9A"
                size="1.5em"
                style={{ margin: 'auto 0' }}
              />
            </span>
            <input type="text" name="searchVal" onChange={onChange} />
          </form>
          <span>
            <select
              onChange={(e) => {
                setSearchField(e.target.value);
              }}
            >
              <option>Search by</option>
              <option value="title">Title</option>
              <option value="file_description">Description</option>
            </select>
          </span>
        </span>
        <span style={{ minHeight: '2em' }}>
          {fileNames.length > 0 && (
            <span className="share_cancel">
              <button
                onClick={() => {
                  setIsModalActive(true);
                }}
                className="share_btn"
              >
                <UilUpload size="1em" color="white" />
                <span style={{ marginLeft: '0.4em' }}>Share</span>
              </button>
              <button
                onClick={() => {
                  setFileNames([]);
                  setIsCheckBoxActive(false);
                }}
                className="cancel-share-btn"
              >
                <span>Cancel</span>
              </button>
            </span>
          )}
        </span>
        {searchResults &&
          (searchResults.length > 0
            ? searchResults.map((file) => (
                <FeedItem
                  file={file}
                  key={file.file_id}
                  fileNames={fileNames}
                  isCheckBoxActive={isCheckBoxActive}
                  setFileNames={setFileNames}
                  setIsCheckBoxActive={setIsCheckBoxActive}
                  setIsPreviewPaneActive={setIsPreviewPaneActive}
                  setSelectedPreviewFile={setSelectedPreviewFile}
                />
              ))
            : 'No results found :(')}
      </div>
      <FilePreviewPane
        isPreviewPaneActive={isPreviewPaneActive}
        setIsPreviewPaneActive={setIsPreviewPaneActive}
        file={selectedPreviewFile}
        setSelectedPreviewFile={setSelectedPreviewFile}
      />
    </div>
  );
};

export default Explore;
