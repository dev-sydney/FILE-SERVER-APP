import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UilTimes, UilInfoCircle } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';

import './uploadStyle.scss';
/**
 * The form component used to upload files to the server
 * @param {*} param0
 * @returns
 */
const UploadDocumentForm = ({ setIsModalActive }) => {
  const { user_id } = useParams();

  let uploadFormData = useRef(new FormData());
  const [alertMessage, setAlertMessage] = useState(null);

  const onChange = (e) => {
    //NOTE: If the event target is the file input
    if (e.target.name === 'file') {
      uploadFormData.current.set(e.target.name, e.target.files[0]);
    } else {
      uploadFormData.current.set(e.target.name, e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    uploadFormData.current.set('user_id', user_id);

    fetch('/api/v1/files/', {
      method: 'POST',
      body: uploadFormData.current,
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setAlertMessage(results.message);
          //NOTE: Hides the modal component after 1 sec
          setTimeout(() => {
            setIsModalActive(false);
          }, 1000);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => {
        setAlertMessage(err.message);
      });
  };

  return (
    <div className="upload-file-modal">
      <div style={{ textAlign: 'right' }}>
        <UilTimes
          size="2em"
          className="close-modal-btn"
          onClick={() => {
            setIsModalActive(false);
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {alertMessage && (
          <div className="component-alert">
            <UilInfoCircle size="1.5em" style={{ margin: 'auto 0.5em' }} />

            <b style={{ margin: 'auto 0' }}>{alertMessage}</b>
          </div>
        )}
      </div>

      <span>
        <h2 style={{ color: '#121927' }}>Upload a new file!</h2>
        <p style={{ margin: '0.5em 0' }}>
          Please enter the fill out the form below to get started.
        </p>
      </span>

      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="input-block">
          <input type="text" name="title" onChange={onChange} required />
          <span className="placeholder">Title of file:</span>
        </div>

        <div className="input-block">
          <textarea
            name="file_description"
            id=""
            cols="30"
            rows="10"
            placeholder="A short description of the file"
            onChange={onChange}
            required
          ></textarea>
        </div>

        <div className="input-block">
          <input
            type="file"
            name="file"
            id=""
            onChange={onChange}
            className="file-input"
            accept="image/*,video/*,audio/*,.pdf"
          />
          <span className="placeholder">File:</span>
        </div>

        <input type="submit" value="UPLOAD" className="submit_btn" />
      </form>
    </div>
  );
};

UploadDocumentForm.propTypes = {
  setIsModalActive: PropTypes.func,
};
export default UploadDocumentForm;
