import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../pageStyles.scss';
import alertContext from '../../contexts/AlertContext';
import userContext from '../../contexts/UserContext';

const UpdatePassword = () => {
  const alertContxt = useContext(alertContext);
  const userContxt = useContext(userContext);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
  }, []);

  const handleFormInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
          alertContxt.setAlert(results.message, 'Well done!');
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Something went wrong')
      );
  };
  return (
    <div className="change_password__container">
      <h1 style={{ textAlign: 'left', margin: '1em 0' }}>Security settings</h1>
      <form onSubmit={handleFormSubmit}>
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
            required
          />
          <span className="placeholder">New password:</span>
        </div>

        <div className="input-block">
          <input
            onChange={handleFormInputChange}
            type="password"
            name="passwordConfirm"
            id="input-text"
            required
          />
          <span className="placeholder">Confrim password:</span>
        </div>
        <input
          type="submit"
          value="set new password"
          className="password_btn"
        />
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
