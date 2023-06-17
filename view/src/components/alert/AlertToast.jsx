import { useContext } from 'react';
import alertContext from '../../contexts/AlertContext';
import './alertStyle.scss';

const AlertToast = () => {
  const alertContxt = useContext(alertContext);

  return (
    <div
      className={`alert_toast ${
        alertContxt?.alertMessage ? 'show_toast' : 'hide_toast'
      }`}
    >
      <div className="flex_1"></div>

      <div className="flex_2">
        <h2>{alertContxt?.alertMessage?.alertType}</h2>
        <p>{alertContxt?.alertMessage?.message}</p>
      </div>

      <div className="flex_3">
        <button
          onClick={() => {
            alertContxt.clearAlert();
          }}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default AlertToast;
