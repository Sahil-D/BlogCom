import { Axios } from '../config';

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await Axios.post('/user/login', userCredentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};
