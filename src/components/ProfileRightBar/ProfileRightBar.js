import { useEffect, useState } from 'react';
import './profileRightBar.css';
import { Axios } from '../../config';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function ProfileRightBar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friendsList, setFriendsList] = useState([]);
  const [fetchingList, setIsFetchingList] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        if (user && user._id) {
          const res = await Axios.get(`/user/friends/${user._id}`);
          setFriendsList(res.data.data);
          setIsFetchingList(false);
        }
      } catch (err) {
        console.log(err);
        setErrorFetching(true);
        setIsFetchingList(false);
      }
    };
    fetchFriendList();
  }, [user, user._id]);

  if (fetchingList || errorFetching)
    return (
      <div className="profileRight">
        <span className="friendsText">Followings -</span>
        {fetchingList ? (
          <div className="fetchingCircle">
            <CircularProgress color="inherit" size="15px" />
          </div>
        ) : (
          <div className="fetchingFriendsError">Error fetching Friends !!!</div>
        )}
      </div>
    );

  return (
    <div className="profileRight">
      <span className="friendsText">Followings -</span>
      <div className="friendsZone">
        {!friendsList.length ? (
          <div className="nofriendsText">
            {user.username} is not following anyone yet{' '}
          </div>
        ) : (
          friendsList.map((friend, index) => {
            return (
              <Link
                to={'/profile/' + friend.username}
                style={{ textDecoration: 'none' }}
                key={index.toString()}
              >
                <div className="oneFriend" key={friend.username}>
                  <img
                    src={
                      friend.avatar || PF + 'images/sample_profile_image.png'
                    }
                    alt=""
                    className="friendImage"
                  />
                  <span className="friendName">{friend.username}</span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
