import { useRef, useContext, useEffect, useState } from 'react';
import { UilImageEdit, UilSpinner } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

import './../pageStyles.scss';
import alertContext from '../../contexts/AlertContext';
import userContext from '../../contexts/UserContext';
const AccountSettings = () => {
  const alertContxt = useContext(alertContext);
  const userContxt = useContext(userContext);

  const [isLoading, setIsLoading] = useState(false);

  let formData = useRef(new FormData());

  useEffect(() => {
    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
  }, []);

  const handleFormInputChange = (e) => {
    if (e.target.name === 'photo') {
      formData.current.set(e.target.name, e.target.files[0]);
    } else {
      formData.current.set(e.target.name, e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch('/api/v1/users/account-update', {
      method: 'PATCH',
      body: formData.current,
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setIsLoading(false);

          alertContxt.setAlert(results.message, 'Well done');

          formData.current = new FormData();
        } else {
          setIsLoading(false);

          formData.current = new FormData();

          throw new Error(results.messsage);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Something went wrong')
      );
  };
  return (
    <div className="update-profile-page">
      <h1 style={{ textAlign: 'left', margin: '1em 1em' }}>Edit Profile</h1>
      <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <label
            htmlFor="photo"
            className="file__upload"
            style={{ cursor: 'pointer' }}
          >
            <UilImageEdit
              color="#5B89CC"
              size="5em"
              style={{
                padding: '0.5em',
                borderRadius: '50%',
                background: '#B3BFDA',
              }}
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              id="photo"
              className="form__upload"
              style={{ display: 'none' }}
              onChange={handleFormInputChange}
            />
          </label>
        </div>
        <p style={{ color: 'gray', margin: '0.5em 0' }}>Choose a photo</p>

        <div className="input-block">
          <input
            type="text"
            className="username__input"
            name="user_name"
            onChange={handleFormInputChange}
            placeholder="username"
          />
        </div>

        <div className="input-block">
          <input
            type={'email'}
            name="emailAddress"
            id="input-text"
            onChange={handleFormInputChange}
            placeholder="youremail@example.com"
            // required
          />
        </div>

        <div style={{ width: '100%', margin: '0.5em 0' }}>
          <button className="submit_btn" style={{ width: '92%' }}>
            {isLoading ? (
              <span>
                <UilSpinner size="1.4em" className="spinner-icon" />
              </span>
            ) : (
              'save changes'
            )}
          </button>
        </div>
      </form>
      <div style={{ textAlign: 'center', marginTop: '.5em' }}>
        <Link to="/account/overview" style={{ color: 'gray' }}>
          <p>Cancel</p>
        </Link>
      </div>
    </div>
  );
};

export default AccountSettings;
