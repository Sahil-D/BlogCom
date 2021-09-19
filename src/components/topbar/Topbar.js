import './topbar.css';
import { Search, Chat, ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar({ profileScreen, messengerScreen }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span>BlogCom</span>
        </Link>
      </div>
      <div className="topbarCenter">
        {profileScreen || messengerScreen ? null : (
          <>
            <Search className="searchIcon" />
            <input
              type="text"
              placeholder="Search Posts"
              className="searchInput"
            />
          </>
        )}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/">
            <span className="topbarLink">HomePage</span>
          </Link>
          <Link to={`/profile/${user.username}`}>
            <span className="topbarLink">My Timeline</span>
          </Link>
        </div>
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">4</span>
          </div> */}
          <Link
            to="/messenger"
            className="topbarIconItem"
            style={{ textDecoration: 'none' }}
          >
            <div className="topbarIconItem">
              <Chat htmlColor="white" />
              <span className="topbarIconBadge">4</span>
            </div>
          </Link>
          {/* <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">4</span>
          </div> */}

          <Link to={`/profile/${user?.username}`} className="topbarIconItem">
            <img
              src={user.avatar || PF + 'images/sample_profile_image.png'}
              alt=""
              className="topbarProfileImage"
            />
          </Link>
          <div
            className="topbarIconItem"
            style={{
              padding: '2px',
              marginTop: '2px',
              marginLeft: '4px',
              display: 'flex',
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
            }}
            onClick={() => {
              dispatch({ type: 'LOGOUT' });
            }}
          >
            <ExitToApp htmlColor="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
