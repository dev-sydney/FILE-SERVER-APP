import { useState } from 'react';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const handleFormInputChange = (e) => {
    setEmailAddress(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/forgot-password', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email_address: emailAddress }),
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setAlertMessage(results.message);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => setAlertMessage(err.message));
  };
  return (
    <div className="forgotpassword-container">
      {alertMessage && <b>{alertMessage}</b>}
      <form className="auth__form" onSubmit={handleFormSubmit}>
        <div className="form__group">
          <input
            className="form__input"
            type="email"
            placeholder="Youremail@example.com"
            required
            name="emailAddress"
            value={emailAddress}
            onChange={handleFormInputChange}
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

export default ForgotPassword;
