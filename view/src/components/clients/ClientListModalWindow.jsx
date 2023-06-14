import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { UilTimes } from '@iconscout/react-unicons';

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

  const formData = useRef({
    caption: '',
    subject: '',
  });
  // TODO: Get all the clients contacts for the business
  useEffect(() => {
    fetch(
      '/api/v1/clients/?fields=client_first_name,client_last_name,client_email,client_id&client_status=1&sort=client_last_name,client_first_name:asc'
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setClients(results.clientsContacts);
        } else {
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
          setAlertMessage(results.message);

          setTimeout(() => {
            setFileNames([]);
            setIsModalActive(false);
            setIsCheckBoxActive(false);
          }, 800);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => setAlertMessage(err.message));
  };

  return (
    <div className="client_modal_window">
      <div style={{ textAlign: 'right' }}>
        <UilTimes
          size="2em"
          color="#E9EBEF"
          onClick={() => {
            setIsModalActive(false);
          }}
        />
      </div>

      {errorMessage && errorMessage}
      {/* NOTE: Conditional rendering logic, of the response gotten after attempting to share a file */}
      {alertMessage && alertMessage}
      <h2 style={{ textAlign: 'left' }}>Your Clients</h2>

      <div>
        {/* NOTE:Form for submitting the subject & caption */}
        <form onSubmit={handleFormSubmit}>
          <div className="form_group">
            <label htmlFor="">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={handleFormInputChange}
            />
          </div>
          <input type="submit" value={'SEND'} />
        </form>

        {/*NOTE: The select all checkbox */}
        <span>
          <input
            type="checkbox"
            onChange={handleSelectAllChange}
            checked={checked.length === clients?.length}
          />
          <label htmlFor="">Select all</label>
        </span>
      </div>

      {/*NOTE: The conditonal rendering logic of all the clients */}
      {clients &&
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
        ))}
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
