import { useRef, useState } from 'react';
import './share.css';
import { Label, EmojiEmotions, Room } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Axios } from '../../config';
import { CircularProgress } from '@material-ui/core';

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  const postDescription = useRef(null);
  const [inProgress, setInProgress] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      username: user.username,
      avatar: user.avatar,
      description: postDescription.current.value,
    };

    try {
      setInProgress(true);
      await Axios.post('/post', newPost);
      dispatch({ type: 'RELOAD_FEED' });
      postDescription.current.value = '';
      setInProgress(false);
    } catch (err) {
      console.log(err);
      setInProgress(false);
    }
  };

  return (
    <form className="share" onSubmit={handleCreatePost}>
      <div className="shareTopPart">
        <img
          src={user.avatar || PF + 'images/sample_profile_image.png'}
          alt=""
          className="shareImage"
        />
        <input
          type="text"
          className="shareInputText"
          placeholder={`What's in your mind ${user.username || '...'}?`}
          ref={postDescription}
          required
        />
      </div>
      <hr className="hr" />
      <div className="bottomPart">
        <div className="bottomOptionsPart">
          <div className="shareOptions">
            <Label htmlColor="#432985" />
            <span className="shareOptionName">Tag</span>
          </div>
          <div className="shareOptions">
            <Room htmlColor="#349e3f" />
            <span className="shareOptionName">Location</span>
          </div>
          <div className="shareOptions">
            <EmojiEmotions htmlColor="#fce803" />
            <span className="shareOptionName">Feeling</span>
          </div>
        </div>
        <div className="bottomSharePart">
          <button type="submit" className="shareButton" disabled={inProgress}>
            {inProgress ? (
              <CircularProgress size="12px" color="inherit" />
            ) : (
              'Share'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
