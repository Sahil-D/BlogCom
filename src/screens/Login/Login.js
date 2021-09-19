import { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Login() {
  const email = useRef(null);
  const password = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="leftPart">
          <h3 className="loginLogo">BlogCam</h3>
          <span className="description">
            Connect with friends and the world around you on BlogCam.
          </span>
        </div>
        <div className="rightPart">
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              ref={password}
              required
              minLength={6}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                'LOG IN'
              )}
            </button>
            <a href="#H">
              <span className="forgotText">Forgot Password?</span>
            </a>
            <Link
              to="/register"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <button className="createAccountButton" disabled={isFetching}>
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  'Create a New Account'
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
