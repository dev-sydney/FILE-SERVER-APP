/* eslint-disable react/no-unescaped-entities */
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import alertContext from '../contexts/AlertContext';
import userContext from '../contexts/UserContext';
import { UilKeySkeleton } from '@iconscout/react-unicons';

const ResetPassword = () => {
  const alertContxt = useContext(alertContext);
  const userContxt = useContext(userContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    userContxt.setNavBarVisibilty(false);
    //eslint-disable-next-line
  }, []);

  const { resetToken } = useParams();
  const navigateTo = useNavigate();

  const handleFormInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/v1/users/reset-password/${resetToken}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          alertContxt.setAlert(results.message, 'Awesome');

          setTimeout(() => {
            navigateTo('/login');
          }, 2000);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Something went wrong')
      );
  };

  return (
    <div className="auth-page">
      <form className="auth__form" onSubmit={handleFormSubmit}>
        <UilKeySkeleton color="#121927" size="3em" />
        <h2 style={{ margin: '0.7em 0' }}>Reset your password!</h2>
        <p style={{ margin: '0.7em 0' }}>
          Enter your new password to login into your account
        </p>
        <div className="input-block">
          <input
            name="password"
            onChange={handleFormInputChange}
            type="password"
            required
          />
          <span className="placeholder">Password: </span>
        </div>
        <div className="input-block">
          <input
            name="password_confirm"
            onChange={handleFormInputChange}
            type="password"
            required
          />
          <span className="placeholder">Confirm password: </span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          <input
            className="auth-submit submit_btn"
            type="submit"
            value={'DONE'}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
