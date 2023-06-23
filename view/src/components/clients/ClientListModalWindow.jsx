import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { UilTimes, UilSpinner, UilPlusCircle } from '@iconscout/react-unicons';
import SkeletonClientItem from './SkeletonClientItem';

import './clientStyle.scss';
/**
 * Renders a modal window component made up of a checklist of all the clients & a form to input
 * the subject of the mail being shared
 * @param {*} param0
 * @returns
 */
const ClientListModalWindow = ({
  setIsModalActive,
  fileNames,
  setFileNames,
  setIsCheckBoxActive,
}) => {
  //setclients
  const [clients, setClients] = useState(null);
  const [checked, setChecked] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isFetchingClients, setIsFetchingClients] = useState(null);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const formData = useRef({
    caption: '',
    subject: '',
  });
  // TODO: Get all the clients contacts for the business
  useEffect(() => {
    setIsFetchingClients(true);

    fetch(
      '/api/v1/clients/?fields=client_first_name,client_last_name,client_email,client_id&client_status=1&sort=client_last_name,client_first_name:asc'
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setClients(results.clientsContacts);
          setIsFetchingClients(false);
        } else {
          setIsFetchingClients(false);
          throw new Error(results.message);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, []);

  /**
   * Handles to logic of keeping track of the selected contacts
   * in the list of checkbox inputs
   * @param {Object} e event object
   */
  const handleCheckBoxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(
        checked.filter((currentClientIds) => currentClientIds !== value)
      );
    }
  };

  /**
   * Handles the logic to check and uncheck all the contacts in the
   * list of checkbox inputs
   * @param {Object} e event object
   */
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allClientIds = clients.map((el) => `${el.client_id}`);
      setChecked(allClientIds);
    } else {
      setChecked([]);
    }
  };

  /**
   * Handles the logic for keeping tracking of the form data to be sent
   * @param {Object} e event object
   */
  const handleFormInputChange = (e) => {
    formData.current = { ...formData.current, [e.target.name]: e.target.value };
  };

  /**
   * Handles the logic for when the form gets submmitted and after
   * @param {Object} e event object
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch(
      `/api/v1/files/share?client_ids=${checked.join(
        ','
      )}&fileName=${fileNames}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData.current),
      }
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setIsLoading(false);
          setAlertMessage(results.message);

          setTimeout(() => {
            setFileNames([]);
            setIsModalActive(false);
            setIsCheckBoxActive(false);
          }, 800);
        } else {
          setIsLoading(false);
          throw new Error(results.message);
        }
      })
      .catch((err) => setAlertMessage(err.message));
  };

  return (
    <div className="client_modal_window">
      <div style={{ textAlign: 'right', marginTop: '.7em' }}>
        <UilTimes
          size="2em"
          onClick={() => {
            setIsModalActive(false);
          }}
          className="close-modal-btn"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* NOTE: Conditional rendering logic of the component to display an error message incase they was trouble getting the client's contacts*/}
        {errorMessage && (
          <div className="component-alert">
            <b>{errorMessage}</b>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* NOTE: Conditional rendering logic, of the component to display an alert message after attempting to share a file */}
        {alertMessage && (
          <div className="component-alert">
            <b>{alertMessage}</b>
          </div>
        )}
      </div>

      <h2 style={{ textAlign: 'left', padding: '0 0.4em' }}>
        Share to your clients
      </h2>

      <div>
        {/* NOTE:Form for submitting the subject & caption */}
        <form onSubmit={handleFormSubmit} className="email-subject-form">
          <div className="input-block" style={{ width: '20em' }}>
            <input
              type="text"
              name="subject"
              onChange={handleFormInputChange}
              required
            />
            <span className="placeholder">Subject:</span>
          </div>

          <button className="submit_btn email-submit">
            {isLoading ? (
              <span>
                <UilSpinner size="1.5em" className="spinner-icon" />
              </span>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
      {/*NOTE: The 'select all' checkbox */}
      <span
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 1em',
        }}
      >
        <input
          type="checkbox"
          onChange={handleSelectAllChange}
          checked={checked.length === clients?.length}
        />
        <label htmlFor="" style={{ margin: 'auto 0' }}>
          Select all
        </label>
      </span>

      {/*NOTE: The conditonal rendering logic of all the clients */}
      {isFetchingClients ? (
        arr.map((el) => <SkeletonClientItem key={el} />)
      ) : clients?.length > 0 ? (
        clients.map((client) => (
          <div className="client_item" key={client.client_id}>
            <div className="checkbox">
              <input
                type="checkbox"
                value={client.client_id}
                onChange={handleCheckBoxChange}
                checked={checked.includes(`${client.client_id}`)}
              />
            </div>
            <div className="client_details">
              <b>{`${client.client_first_name} ${client.client_last_name}`}</b>
              <p>{client.client_email}</p>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            margin: '0 auto',
            width: 'fit-content',
          }}
        >
          <p>No clients added yet</p>
          <button className="add-client-btn">
            <span>Add Client</span>
            <UilPlusCircle size="1.3em" color="#121927" />
          </button>
        </div>
      )}
    </div>
  );
};

ClientListModalWindow.propTypes = {
  setIsModalActive: PropTypes.func,
  setIsCheckBoxActive: PropTypes.func,
  setFileNames: PropTypes.func,
  fileNames: PropTypes.string,
};

export default ClientListModalWindow;
