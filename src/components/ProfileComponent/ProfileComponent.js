import { CircularProgress } from '@material-ui/core';
import { Add, Check } from '@material-ui/icons';
import { Axios } from '../../config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './profileComponent.css';

export default function ProfileComponent({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    setFollowed(currentUser?.following.includes(user?._id));
  }, [currentUser?.following, user?._id]);

  const handleFollowButtonClick = async () => {
    try {
      setInProgress(true);
      if (followed) {
        await Axios.put(`/user/${user?._id}/unfollow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: 'UNFOLLOW', payload: user?._id });
      } else {
        await Axios.put(`/user/${user?._id}/follow`, {
          userId: currentUser?._id,
        });
        await Axios.post(`/conversation`, {
          senderId: currentUser?._id,
          receiverId: user?._id,
        });
        dispatch({ type: 'FOLLOW', payload: user?._id });
      }
      setFollowed(!followed);
      setInProgress(false);
    } catch (err) {
      console.log(err);
      setInProgress(false);
    }
  };

  return (
    <div className="component">
      <img src={PF + 'images/cover.png'} alt="" className="coverImage" />
      <img
        src={user.avatar || PF + 'images/sample_profile_image.png'}
        alt="Hi"
        className="profileImage"
      />
      <span className="username">{user.username || '...'}</span>
      <span className="userEmail">{user.email || '...'}</span>

      {currentUser?.username === user.username ? null : (
        <button
          className="followButton"
          onClick={handleFollowButtonClick}
          disabled={inProgress}
        >
          {inProgress ? (
            <CircularProgress color="inherit" size="10px" />
          ) : (
            <>
              {followed ? 'Following ' : 'Follow '}
              {followed ? (
                <Check className="followCheck" />
              ) : (
                <Add className="followAdd" />
              )}{' '}
            </>
          )}
        </button>
      )}
    </div>
  );
}
