// import { useEffect, useState } from 'react';
import './sideBarUser.css';
import { Link } from 'react-router-dom';

export default function SideBarUser({ userInfo }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Link
      to={`/profile/${userInfo.username}`}
      className="sideBarUser"
      style={{ textDecoration: 'none' }}
    >
      <img
        src={userInfo?.avatar || PF + 'images/sample_profile_image.png'}
        alt=""
        className="sideBarUserImage"
      />
      <span className="sideBarUserName">{userInfo?.username || '...'}</span>
    </Link>
  );
}
