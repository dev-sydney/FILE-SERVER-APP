import { useState, useContext, useEffect } from 'react';
import userContext from './../contexts/UserContext';
import { useNavigate } from 'react-router';

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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userContxt.loginUser(formData, navigateTo);
        }}
      >
        <div className="form_group">
          <label htmlFor="">Email address:</label>
          <input type="email" name="emailAddress" onChange={onChange} />
        </div>
        <div className="form_group">
          <label htmlFor="">Password:</label>
          <input type="password" name="password" onChange={onChange} />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
