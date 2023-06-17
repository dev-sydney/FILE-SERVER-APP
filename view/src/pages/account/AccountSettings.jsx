import { useRef, useContext } from 'react';
import { UilUser } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

import './../pageStyles.scss';
import alertContext from '../../contexts/AlertContext';

const AccountSettings = () => {
  const alertContxt = useContext(alertContext);

  let formData = useRef(new FormData());

  const handleFormInputChange = (e) => {
    if (e.target.name === 'photo') {
      formData.current.set(e.target.name, e.target.files[0]);
    } else {
      formData.current.set(e.target.name, e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/account-update', {
      method: 'PATCH',
      body: formData.current,
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          alertContxt.setAlert(results.message, 'Well done');
          formData.current = new FormData();
        } else {
          formData.current = new FormData();
          throw new Error(results.messsage);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Something went wrong')
      );
  };
  return (
    <div className="profile__container">
      <h1 style={{ textAlign: 'left', margin: '1em 0' }}>Edit Profile</h1>
      <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            minHeight: 'fit-content',
            maxHeight: 'fit-content',
            minWidth: 'fit-content',
            maxWidth: 'fit-content',
            borderRadius: '50%',
          }}
        >
          <label htmlFor="photo" className="file__upload">
            <UilUser color="#828282" size="60" />
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

        <div className="input-block">
          <input
            type="text"
            className="username__input"
            name="user_name"
            onChange={handleFormInputChange}
          />
          <span className="placeholder">Username: </span>
        </div>

        <div className="input-block">
          <input
            type={'email'}
            name="emailAddress"
            id="input-text"
            onChange={handleFormInputChange}
            // required
          />
          <span className="placeholder">Email:</span>
        </div>

        <button className="save__btn" onClick={handleFormSubmit}>
          save changes
        </button>
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
