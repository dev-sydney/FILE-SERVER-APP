import { useState, useContext, useEffect } from 'react';
import userContext from './../contexts/UserContext';

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
    <div>
      {userContxt?.signUpSuccessMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userContxt.registerUser(formData);
        }}
      >
        <div className="form_group">
          <label htmlFor="">Email address:</label>
          <input type="text" name="email_address" onChange={onChange} />
        </div>
        <div className="form_group">
          <label htmlFor="">Company name:</label>
          <input type="text" name="user_name" onChange={onChange} />
        </div>
        <div className="form_group">
          <label htmlFor="">Password:</label>
          <input type="password" name="user_password" onChange={onChange} />
        </div>
        <div className="form_group">
          <label htmlFor="">Confirm password:</label>
          <input type="password" name="password_confirm" onChange={onChange} />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Signup;
