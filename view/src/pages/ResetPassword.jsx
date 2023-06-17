import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);

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
          setAlertMessage(results.message);

          setTimeout(() => {
            navigateTo('/login');
          }, 2000);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => setAlertMessage(err.message));
  };
  return (
    <div className="resetpassword-container">
      {alertMessage && <b>{alertMessage}</b>}
      <form className="auth__form" onSubmit={handleFormSubmit}>
        <div className="form__group">
          <label htmlFor="" className="form__label">
            Password:{' '}
          </label>
          <input
            name="password"
            onChange={handleFormInputChange}
            type="password"
            className="form__input"
            placeholder="• • • • • • • •"
          />
        </div>
        <div className="form__group">
          <label htmlFor="" className="form__label">
            Confirm password:{' '}
          </label>
          <input
            name="password_confirm"
            onChange={handleFormInputChange}
            type="password"
            className="form__input"
            placeholder="• • • • • • • •"
          />
        </div>
        <button className="login-btn " onClick={handleFormSubmit}>
          {/* NOTE:'condtional rendering logic for displaying either the loading animation or 'done'  */}
          done
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
