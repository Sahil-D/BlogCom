import './sidebar.css';
import { Bookmark, CalendarToday, Home, Chat } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import SideBarUser from '../SideBarUser/SideBarUser';
import { useContext, useEffect, useState } from 'react';
import { Axios } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';

export default function Sidebar() {
  const [sideBarUserList, setSideBarUserList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUnfollowedUsers = async () => {
      try {
        const res = await Axios.get(`/user/unfollowed/${user?._id}`);
        setSideBarUserList(res.data.data);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
        setIsFetching(false);
        setErrorFetching(true);
      }
    };
    fetchUnfollowedUsers();
  }, [user]);

  return (
    <div className="sidebar">
      <div className="sideBarList">
        <div className="sideBarListTop">
          <Link to="/" style={{ textDecoration: 'none' }} className="listItem">
            <Home />
            <span className="listItemName">Home</span>
          </Link>
          <Link
            to="/messenger"
            style={{ textDecoration: 'none' }}
            className="listItem"
          >
            <Chat />
            <span className="listItemName">Chats</span>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }} className="listItem">
            <Bookmark />
            <span className="listItemName">Bookmarks</span>
          </Link>
          <Link to="/" style={{ textDecoration: 'none' }} className="listItem">
            <CalendarToday />
            <span className="listItemName">Events</span>
          </Link>
        </div>

        <div className="sideBarListBottom">
          <span className="connectText">Connect Users -</span>
          {isFetching || errorFetching ? (
            <div className="sideBarUserList">
              {isFetching ? (
                <div className="fetchingCircle">
                  <CircularProgress size="12px" color="inherit" />
                </div>
              ) : (
                <span className="errorMsg">Error fetching Users</span>
              )}
            </div>
          ) : (
            <div className="sideBarUserList">
              {!sideBarUserList.length ? (
                <span className="allFollowingText">
                  You are following all users :)
                </span>
              ) : (
                sideBarUserList.map((u, index) => {
                  return <SideBarUser userInfo={u} key={index.toString()} />;
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
