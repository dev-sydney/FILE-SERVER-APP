import PinInput from 'react-pin-input';
import { useState, useContext, useEffect } from 'react';
import userContext from '../contexts/UserContext';
import { useNavigate } from 'react-router';

const AccountVerification = () => {
  const userContxt = useContext(userContext);
  const navigateTo = useNavigate();

  const [verification_code] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    userContxt.setNavBarVisibilty(false);
    //eslint-disable-next-line
  }, []);

  const onComplete = (value) => {
    fetch('/api/v1/users/verification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ verification_code: value }),
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          userContxt.setUserAfterVerification(results.user);

          setResponseMessage('Account verified successfully!');

          setTimeout(() => {
            navigateTo('/');
          }, 1000);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => {
        setResponseMessage(err.message);
      });
  };

  return (
    <div className="auth-page">
      <div>
        <h1>ENTER CODE</h1>
        <p>
          Did you get a verification code? Enter it below and get started now.
        </p>
        <PinInput
          length={6}
          initialValue={verification_code}
          secret
          secretDelay={500}
          type="numeric"
          inputMode="number"
          style={{ padding: '10px' }}
          inputFocusStyle={{ border: '1px solid blue' }}
          onComplete={onComplete}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        {responseMessage !== '' && responseMessage}
        {/* <p>Did not get the code?</p>
        <b>RESEND CODE</b> */}
      </div>
    </div>
  );
};

export default AccountVerification;
