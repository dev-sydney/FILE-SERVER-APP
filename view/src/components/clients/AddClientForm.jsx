/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { UilTimes, UilSpinner, UilInfoCircle } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';
import './clientStyle.scss';

const AddClientForm = ({ setIsFormModalActive }) => {
  const [formData, setFormData] = useState({
    client_first_name: '',
    client_last_name: '',
    client_email: '',
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

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
          setIsLoading(false);
          setAlertMessage(results.message);
          setFormData({
            client_first_name: '',
            client_last_name: '',
            client_email: '',
          });
          setTimeout(() => {
            setAlertMessage(null);
          }, 1000);
        } else {
          setIsLoading(false);

          throw new Error(results.message);
        }
      })
      .catch((err) => setAlertMessage(err.message));
  };
  return (
    <div style={{ background: 'white' }} className="add-client-form">
      <div style={{ textAlign: 'right' }}>
        <UilTimes
          size="2em"
          className="close-modal-btn"
          onClick={() => {
            setIsFormModalActive(false);
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* NOTE: Conditional rendering logic, of the component to display an alert message after attempting to share a file */}
        {alertMessage && (
          <div className="component-alert">
            <UilInfoCircle size="1.5em" style={{ margin: 'auto 0.5em' }} />
            <b style={{ margin: 'auto 0' }}>{alertMessage}</b>
          </div>
        )}
      </div>

      <h2>Add a client!</h2>
      <p>Please enter the client's names and email to be added.</p>

      <form onSubmit={handleFormSubmit}>
        <div className="input-block">
          <input
            required
            type="text"
            name="client_first_name"
            value={formData.client_first_name}
            onChange={handleFormInputChange}
          />
          <span className="placeholder">First name:</span>
        </div>
        <div className="input-block">
          <input
            required
            type="text"
            name="client_last_name"
            value={formData.client_last_name}
            onChange={handleFormInputChange}
          />
          <span className="placeholder">Last name:</span>
        </div>
        <div className="input-block">
          <input
            required
            type="email"
            name="client_email"
            value={formData.client_email}
            onChange={handleFormInputChange}
          />
          <span className="placeholder">Email address:</span>
        </div>
        <button className="submit_btn" style={{ margin: '1em 0' }}>
          {isLoading ? (
            <span>
              <UilSpinner size="1.4em" className="spinner-icon" />
            </span>
          ) : (
            'Add contact'
          )}
        </button>
      </form>
    </div>
  );
};
AddClientForm.propTypes = {
  setIsFormModalActive: PropTypes.func,
};
export default AddClientForm;
