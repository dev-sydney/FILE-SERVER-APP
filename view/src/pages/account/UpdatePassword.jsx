import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../pageStyles.scss';
import alertContext from '../../contexts/AlertContext';
import userContext from '../../contexts/UserContext';
import { UilSpinner } from '@iconscout/react-unicons';

const UpdatePassword = () => {
  const alertContxt = useContext(alertContext);
  const userContxt = useContext(userContext);

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
  }, []);

  const handleFormInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch('/api/v1/users/password-update', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setIsLoading(false);
          alertContxt.setAlert(results.message, 'Well done!');
        } else {
          setIsLoading(false);
          throw new Error(results.message);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Something went wrong')
      );
  };
  return (
    <div className="update-password-page">
      <h1 style={{ textAlign: 'left', margin: '1em 2em' }}>
        Security settings
      </h1>
      <form onSubmit={handleFormSubmit} className="update-password-form">
        <div className="input-block">
          <input
            onChange={handleFormInputChange}
            type="password"
            name="currentPassword"
            id="input-text"
            required
          />
          <span className="placeholder">Current password:</span>
        </div>

        <div className="input-block">
          <input
            onChange={handleFormInputChange}
            type="password"
            name="newPassword"
            id="input-text"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
            required
          />
          <span className="placeholder">New password:</span>
        </div>

        <div className="input-block">
          <input
            onChange={handleFormInputChange}
            type="password"
            name="passwordConfirm"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters"
            required
          />
          <span className="placeholder">Confirm password:</span>
        </div>
        <div style={{ width: '100%', margin: '0.5em 0' }}>
          <button className="submit_btn" style={{ width: '92%' }}>
            {isLoading ? (
              <span>
                <UilSpinner size="1.4em" className="spinner-icon" />
              </span>
            ) : (
              'set new password'
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

export default UpdatePassword;
