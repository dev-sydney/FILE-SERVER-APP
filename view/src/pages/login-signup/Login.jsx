/* eslint-disable react/no-unescaped-entities */
import { useState, useContext, useEffect } from 'react';
import userContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { UilSpinner } from '@iconscout/react-unicons';

import './login-signup-style.scss';

/**
 * The login page
 * @returns
 */
const Login = () => {
  const userContxt = useContext(userContext);
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({});

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    userContxt.setNavBarVisibilty(false);
    //eslint-disable-next-line
  }, []);
  return (
    <div className="login-page auth-page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userContxt.loginUser(formData, navigateTo);
        }}
      >
        <h2>LOGIN</h2>
        <div className="input-block">
          <input
            type="email"
            name="emailAddress"
            onChange={onChange}
            required
          />
          <span className="placeholder">Email address:</span>
        </div>

        <div className="input-block">
          <input type="password" name="password" onChange={onChange} required />
          <span className="placeholder">Password:</span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <Link to={'/forgot-password'} style={{ marginRight: '0.7em' }}>
            Forgot password?
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          <button className="submit_btn login-submit auth-submit">
            {userContxt?.isLoading ? (
              <span>
                <UilSpinner size="1.5em" className="spinner-icon" />
              </span>
            ) : (
              'Login'
            )}
          </button>
        </div>
        <div style={{ marginTop: '1em' }}>
          <p>
            Don't have an account? <Link to={'/signup'}>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;