import { useEffect, useState } from 'react';
import './profile.css';
import { Axios } from '../../config';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/Feed/Feed';
import ProfileRightBar from '../../components/ProfileRightBar/ProfileRightBar';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';
import { useParams } from 'react-router';

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`/user?username=${username}`);
      setUser(res.data.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar profileScreen={true} />
      <div className="profileWrapper">
        <Sidebar />
        <div className="profileContainer">
          <ProfileComponent user={user} />
          <div className="profileMiddleSection">
            <Feed profile={true} profileUsername={username} />
            <ProfileRightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
