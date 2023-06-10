import './modalStyle.scss';
import PropTypes from 'prop-types';

const Modalbackground = ({ modalChild }) => {
  return <div className="modal_bg">{modalChild}</div>;
};

Modalbackground.propTypes = {
  modalChild: PropTypes.object,
};
export default Modalbackground;
