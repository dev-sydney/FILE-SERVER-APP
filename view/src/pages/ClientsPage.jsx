import { useState, useEffect, useContext } from 'react';
import AddClientForm from '../components/clients/AddClientForm';
import Modalbackground from '../components/modal/ModalBackground';

import { UilPlusCircle, UilTrashAlt } from '@iconscout/react-unicons';
// import PropTypes from 'prop-types'
import './../components/clients/clientStyle.scss';
import alertContext from '../contexts/AlertContext';
import userContext from '../contexts/UserContext';
import SkeletonClientItem from '../components/clients/SkeletonClientItem';
/**
 * This page fetches data(all the clients of a business) and renders them
 * @returns
 */
const ClientsPage = () => {
  const alertContxt = useContext(alertContext);
  const userContxt = useContext(userContext);

  const [clientContacts, setClientContacts] = useState(null);
  const [isFormModalActive, setIsFormModalActive] = useState(false);
  const [checked, setChecked] = useState([]);
  const [isFetchingClients, setIsFetchingClients] = useState(true);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    fetch(
      '/api/v1/clients/?fields=client_first_name,client_last_name,client_email,client_id&client_status=1&sort=client_first_name,client_last_name:asc'
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setClientContacts(results.clientsContacts);
          setIsFetchingClients(false);
        } else {
          setIsFetchingClients(false);
          throw new Error(results.message);
        }
      })
      .catch((err) =>
        alertContxt.setAlert(err.message, 'Something went wrong!')
      );

    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
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

  const handleOnDeleteClick = () => {
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
          alertContxt.setAlert('Contact deleted successfully', 'Awesome');
        } else {
          throw new Error('Trouble deleting the contact, please try again');
        }
      })
      .catch((err) => alertContxt.setAlert(err.message, 'Uh oh!'));
  };

  return (
    <div className="clients-page">
      {/* NOTE: Conditional rendering logic of the modal */}
      {isFormModalActive && (
        <Modalbackground
          modalChild={
            <AddClientForm setIsFormModalActive={setIsFormModalActive} />
          }
        />
      )}

      <h1 style={{ textAlign: 'left' }}>Your clients</h1>

      <span className="add-delete-buttons">
        <button
          onClick={() => {
            setIsFormModalActive(true);
          }}
          className="add-client-btn"
        >
          <span>Add Client</span>
          <UilPlusCircle size="1.3em" color="#121927" />
        </button>

        <button
          onClick={handleOnDeleteClick}
          className="delete-client-btn"
          disabled={checked?.length < 1}
        >
          <span>Delete Contact</span>
          <UilTrashAlt size="1.3em" color="white" />
        </button>
      </span>
      {/* NOTE: Conditional rendering of the 'select all' checkbox */}
      {clientContacts?.length > 0 && (
        <span
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0 1em',
          }}
        >
          <input type="checkbox" onChange={handleSelectAllChange} />
          <label style={{ margin: 'auto 0' }}>Select All</label>
        </span>
      )}

      {/* NOTE: Conditional rendering logic of the clients contacts */}
      <span
        style={{
          minHeight: '100%',
          overflowY: 'auto',
          padding: '1em 0',
          background: 'white',
          borderRadius: '5px',
        }}
      >
        {isFetchingClients ? (
          arr.map((el) => <SkeletonClientItem key={el} />)
        ) : clientContacts.length > 0 ? (
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
          <div
            style={{
              margin: '0 auto',
              width: 'fit-content',
            }}
          >
            <p>No clients added yet</p>
            <button
              onClick={() => {
                setIsFormModalActive(true);
              }}
              className="add-client-btn"
            >
              <span>Add Client</span>
              <UilPlusCircle size="1.3em" color="#121927" />
            </button>
          </div>
        )}
      </span>
    </div>
  );
};

// ClientsPage.propTypes = {}

export default ClientsPage;
