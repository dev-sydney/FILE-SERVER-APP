import { useState, useEffect } from 'react';
import AddClientForm from '../components/clients/AddClientForm';
import Modalbackground from '../components/modal/ModalBackground';
// import PropTypes from 'prop-types'
import './../components/clients/clientStyle.scss';

const ClientsPage = () => {
  const [clientContacts, setClientContacts] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFormModalActive, setIsFormModalActive] = useState(false);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    fetch(
      '/api/v1/clients/?fields=client_first_name,client_last_name,client_email,client_id&client_status=1&sort=client_first_name,client_last_name:asc'
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setClientContacts(results.clientsContacts);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, [isFormModalActive]);

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
      const allClientIds = clientContacts.map((el) => `${el.client_id}`);
      setChecked(allClientIds);
    } else {
      setChecked([]);
    }
  };
  return (
    <div>
      {/* NOTE: Conditional rendering logic of the modal */}
      {isFormModalActive && (
        <Modalbackground
          modalChild={
            <AddClientForm setIsFormModalActive={setIsFormModalActive} />
          }
        />
      )}
      {errorMessage && errorMessage}
      <h2>Your clients</h2>

      <button
        onClick={() => {
          setIsFormModalActive(true);
        }}
      >
        Add Client
      </button>
      <button
        onClick={() => {
          fetch(`/api/v1/clients/?clientIds=${checked.join(',')}`, {
            method: 'DELETE',
          })
            .then((res) => {
              if (res.status === 204) {
                setClientContacts(
                  clientContacts.filter(
                    (el) => !checked.includes(el.client_id.toString())
                  )
                );
                setErrorMessage('Contact deleted successfully');
              } else {
                throw new Error(
                  'Trouble deleting the contact, please try again'
                );
              }
            })
            .catch((err) => setErrorMessage(err.message));
        }}
      >
        Delete Contacts
      </button>
      <input type="checkbox" onChange={handleSelectAllChange} />
      <label htmlFor="">Select All</label>

      {/* NOTE: Conditional rendering logic of the clients contacts */}
      {clientContacts &&
        (clientContacts.length > 0 ? (
          clientContacts.map((client) => (
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
          <div>
            <p>No Clients Added yet</p>
            <button
              onClick={() => {
                setIsFormModalActive(true);
              }}
            >
              Add Client
            </button>
          </div>
        ))}
    </div>
  );
};

// ClientsPage.propTypes = {}

export default ClientsPage;
