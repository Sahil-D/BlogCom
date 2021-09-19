import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './message.css';
import { format } from 'timeago.js';

export default function Messsage({ message }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const ownMessage = message.senderId === user._id;
  return (
    <div className={ownMessage ? 'message own' : 'message'}>
      <div className="messageTop">
        <img
          src={PF + 'images/sample_profile_image.png'}
          alt=""
          className="messageImage"
        />
        <p className="messageText">{message.text || '...'}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
