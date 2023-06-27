import { useContext, useEffect, useState } from 'react';
import userContext from '../../contexts/UserContext';
import { UilEditAlt } from '@iconscout/react-unicons';
import { Link, useNavigate } from 'react-router-dom';
import { UilSpinner } from '@iconscout/react-unicons';

// import './../pages/pageStyles.scss';
import './../pageStyles.scss';
import alertContext from '../../contexts/AlertContext';
const AccountOverview = () => {
  const navigateTo = useNavigate();

  const userContxt = useContext(userContext);
  const alertContxt = useContext(alertContext);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/v1/users/${userContxt.user.user_id}`)
      .then((res) => res.json())
      .then((results) => {
        if (results.status === 'success') {
          setUserData(results.user);
          setIsLoading(false);
        } else {
          throw new Error(results.message);
        }
      })
      .catch((err) => alertContxt.setAlert(err.message, "Something's wrong"));
    userContxt.setNavBarVisibilty(true);
    //eslint-disable-next-line
  }, []);

  return (
    <div className=" acc-overview-page">
      {isLoading ? (
        <UilSpinner
          size="2.5em"
          color="#121927"
          className="spinner-icon"
          style={{ margin: '0 auto' }}
        />
      ) : (
        <>
          <div className="row">
            <h3>Account Overview</h3>
          </div>

          <div className="row">
            {userData && (
              <img
                role={'presentation'}
                loading="lazy"
                src={`/img/users/${userData.photo}`}
                style={{
                  maxHeight: '8em',
                  minHeight: '8em',
                  minWidth: '8em',
                  maxWidth: '8em',
                  borderRadius: '50%',
                }}
              />
            )}
          </div>

          <p className="labels" style={{ marginTop: '2em' }}>
            Your user name
          </p>
          <div className="row displayname">
            <h3>{userData && userData.user_name}</h3>
            <Link to="/account/profile" style={{ marginLeft: 'auto' }}>
              <UilEditAlt color="#284b63" size="2em" />
            </Link>
          </div>

          <p className="labels">Your email address</p>
          <div className="row displayname">
            <h3>{userData ? userData.email_address : ''}</h3>
            <Link to="/account/profile" style={{ marginLeft: 'auto' }}>
              <UilEditAlt color="#284b63" size="2em" />
            </Link>
          </div>

          <div className="row" style={{ marginTop: '1em' }}>
            <p>
              <Link
                className="password_link overview_btn"
                to="/account/update-password"
                style={{ width: '90%' }}
              >
                Change Password
              </Link>
            </p>
          </div>

          <div className="row">
            <button
              className="overview_btn logout"
              onClick={() => {
                userContxt.logout(navigateTo);
              }}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOverview;
