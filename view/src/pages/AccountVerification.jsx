import PinInput from 'react-pin-input';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const AccountVerification = () => {
  const navigateTo = useNavigate();

  const [verification_code] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const onComplete = (value) => {
    console.log(value);
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
          setResponseMessage(results.message);

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
    </div>
  );
};

export default AccountVerification;
