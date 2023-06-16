import { useState } from 'react';
import { UilTimes } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';

const AddClientForm = ({ setIsFormModalActive }) => {
  const [formData, setFormData] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);

  const handleFormInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('/api/v1/clients/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setAlertMessage(results.message);
          setTimeout(() => {
            setAlertMessage(null);
          }, 1000);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => setAlertMessage(err.message));
  };
  return (
    <div style={{ background: 'white' }}>
      <div style={{ textAlign: 'right' }}>
        <UilTimes
          size="2em"
          color="#E9EBEF"
          onClick={() => {
            setIsFormModalActive(false);
          }}
        />
      </div>
      {alertMessage && <b>{alertMessage}</b>}
      <form onSubmit={handleFormSubmit}>
        <div className="form_group">
          <label htmlFor="">First name:</label>
          <input
            type="text"
            name="client_first_name"
            onChange={handleFormInputChange}
          />
        </div>
        <div className="form_group">
          <label htmlFor="">Last name:</label>
          <input
            type="text"
            name="client_last_name"
            onChange={handleFormInputChange}
          />
        </div>
        <div className="form_group">
          <label htmlFor="">Email address:</label>
          <input
            type="email"
            name="client_email"
            onChange={handleFormInputChange}
          />
        </div>
        <input type="submit" value="ADD CONTACT" />
      </form>
    </div>
  );
};
AddClientForm.propTypes = {
  setIsFormModalActive: PropTypes.func,
};
export default AddClientForm;
