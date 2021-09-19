import { Axios } from '../../config';
import { useRef, useState } from 'react';
import './register.css';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Register() {
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const history = useHistory();
  const [inProgress, setInProgress] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity('Password not same!!!');
    } else {
      setInProgress(true);
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await Axios.post('/user/register', user);
        console.log('processed');
        history.push('/login');
        setInProgress(false);
      } catch (err) {
        console.log(err);
        setInProgress(false);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="leftPart">
          <h3 className="registerLogo">BlogCam</h3>
          <span className="description">
            Connect with friends and the world around you on BlogCam.
          </span>
        </div>
        <div className="rightPart">
          <form className="registerBox" onSubmit={handleRegister}>
            <input
              type="text"
              className="registerInput"
              placeholder="Username"
              required
              ref={username}
            />
            <input
              type="email"
              className="registerInput"
              placeholder="Email"
              required
              ref={email}
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
              minLength={6}
              required
              ref={password}
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Confirm Password"
              minLength={6}
              required
              ref={confirmPassword}
            />
            <button className="registerButton" disabled={inProgress}>
              {inProgress ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                'Sign Up'
              )}
            </button>
            <Link
              to="/login"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <button className="existingAccountButton" disabled={inProgress}>
                {inProgress ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  'Login to Existing Account'
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
