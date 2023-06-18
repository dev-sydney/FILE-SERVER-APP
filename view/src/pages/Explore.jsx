import { useState, useEffect, useContext } from 'react';
import FeedItem from '../components/user-feed/FeedItem';
import userContext from '../contexts/UserContext';
/**
 *
 * @returns The Explore Page Component for searching for files
 */
const Explore = () => {
  const [searchField, setSearchField] = useState('title');
  const [searchResults, setSearchResults] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState('');

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
      }
    }, 800);

    setTypingTimeout(timeout);
  };
  return (
    <div>
      <form>
        <input type="text" name="searchVal" onChange={onChange} />
        <label htmlFor="">Search by:</label>
        <select
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
        >
          <option value="tile">Title</option>
          <option value="file_description">Description</option>
        </select>
      </form>
      <div>
        {searchResults &&
          (searchResults.length > 0
            ? searchResults.map((file) => (
                <FeedItem file={file} key={file.file_id} />
              ))
            : 'No results found :(')}
      </div>
    </div>
  );
};

export default Explore;
