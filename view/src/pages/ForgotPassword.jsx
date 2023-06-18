import { useState, useContext, useEffect } from 'react';
import alertContext from '../contexts/AlertContext';
import userContext from '../contexts/UserContext';

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
    <div className="forgotpassword-container">
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
