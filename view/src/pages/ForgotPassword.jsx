/* eslint-disable react/no-unescaped-entities */
import { useState, useContext, useEffect } from 'react';
import alertContext from '../contexts/AlertContext';
import userContext from '../contexts/UserContext';
import { UilLockOpenAlt } from '@iconscout/react-unicons';

const ForgotPassword = () => {
  const alertContxt = useContext(alertContext);
  const userContxt = useContext(userContext);

  const [emailAddress, setEmailAddress] = useState('');

  useEffect(() => {
    userContxt.setNavBarVisibilty(false);
    //eslint-disable-next-line
  }, []);
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
          alertContxt.setAlert(results.message, 'Well done!');
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Uh oh, something went wrong!')
      );
  };

  return (
    <div className="auth-page">
      <form className="auth__form" onSubmit={handleFormSubmit}>
        <div style={{ textAlign: 'center' }}>
          <UilLockOpenAlt color="#121927" size="2em" />
        </div>
        <h2 style={{ margin: '0.7em 0' }}>Trouble logging in?</h2>
        <p style={{ margin: '0.7em 0' }}>
          Enter your email and we'll send you a link to get back into your
          account.
        </p>
        <div className="input-block">
          <input
            className="form__input"
            type="email"
            required
            name="emailAddress"
            value={emailAddress}
            onChange={handleFormInputChange}
          />
          <span className="placeholder">Email:</span>
        </div>
        <input
          className="auth-submit submit_btn"
          type="submit"
          value={'DONE'}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
