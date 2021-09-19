import { Axios } from '../../config';
import { useEffect, useState } from 'react';
import './conversation.css';

export default function Conversation({
  conversation,
  currentUser,
  usersOnline,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState(null);
  const friendUserId = conversation.members.find(
    (mem) => mem !== currentUser._id
  );
  const isOnline = usersOnline.find((u) => u.userId === friendUserId);

  useEffect(() => {
    const friendId = conversation.members.find(
      (mem) => mem !== currentUser._id
    );
    const getUser = async () => {
      try {
        const res = await Axios.get(`/user?userId=${friendId}`);
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation.members, currentUser._id]);

  return (
    <div className="conversation">
      <img
        src={user?.avatar || PF + 'images/sample_profile_image.png'}
        alt=""
        className="conversationImage"
      />
      {isOnline ? <div className="onlineBadge"></div> : null}

      <span className="conversationName">{user?.username || '...'}</span>
    </div>
  );
}
