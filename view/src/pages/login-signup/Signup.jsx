/* eslint-disable react/no-unescaped-entities */
import { useState, useContext, useEffect } from 'react';
import userContext from '../../contexts/UserContext';
import './login-signup-style.scss';
import { Link } from 'react-router-dom';
import { UilSpinner } from '@iconscout/react-unicons';

const Signup = () => {
  const userContxt = useContext(userContext);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    userContxt.setNavBarVisibilty(false);
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="signup-page auth-page">
      {userContxt?.signUpSuccessMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userContxt.registerUser(formData);
        }}
      >
        <h2>SIGN UP</h2>
        <div className="input-block">
          <input
            required
            type="text"
            name="email_address"
            onChange={onChange}
          />
          <span className="placeholder">Email address:</span>
        </div>
        <div className="input-block">
          <input required type="text" name="user_name" onChange={onChange} />
          <span className="placeholder">Company name:</span>
        </div>
        <div className="input-block">
          <input
            required
            type="password"
            name="user_password"
            onChange={onChange}
          />
          <span className="placeholder">Password:</span>
        </div>
        <div className="input-block">
          <input
            required
            type="password"
            name="password_confirm"
            onChange={onChange}
          />
          <span className="placeholder">Confirm password:</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          <button className="submit_btn signup-submit">
            {userContxt?.isLoading ? (
              <span>
                <UilSpinner size="1.5em" className="spinner-icon" />
              </span>
            ) : (
              'Register'
            )}
          </button>
        </div>
        <div style={{ marginTop: '1em' }}>
          <p>
            Already have an account? <Link to={'/login'}>Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
