import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UilTimes } from '@iconscout/react-unicons';
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
    <div>
      {alertMessage && alertMessage}
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div>
          <UilTimes
            size="2em"
            color="#5575EA"
            onClick={() => {
              setIsModalActive(false);
            }}
          />
        </div>
        <div className="form_group">
          <label htmlFor="">Title:</label>
          <input type="text" name="title" onChange={onChange} />
        </div>

        <div className="form_group">
          <label htmlFor="">Description:</label>
          <textarea
            name="file_description"
            id=""
            cols="30"
            rows="10"
            placeholder="file description"
            onChange={onChange}
          ></textarea>
        </div>

        <div className="form_group">
          <label htmlFor="">File:</label>
          <input type="file" name="file" id="" onChange={onChange} />
        </div>

        <input type="submit" value="UPLOAD" />
      </form>
    </div>
  );
};

UploadDocumentForm.propTypes = {
  setIsModalActive: PropTypes.func,
};
export default UploadDocumentForm;
