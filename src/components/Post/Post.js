import { useContext, useEffect, useState } from 'react';
import './post.css';
import { Share } from '@material-ui/icons';
import { Axios } from '../../config';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const [likes, setLikes] = useState(post.likes.length || 0);
  const [isLiked, setIsLiked] = useState(false);

  // like and dislike are handled at backend
  const likeHandler = async () => {
    try {
      await Axios.put(`/post/${post._id}/like`, { userId: user._id });
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await Axios.get(`/user?userId=${post.userId}`);
  //     setPostUser(res.data.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [post.likes, user._id]);

  return (
    <div className="post">
      <div className="postTopPart">
        <Link to={`profile/${post.username}`}>
          <img
            src={post.avatar || PF + 'images/sample_profile_image.png'}
            alt=""
            className="postUserImage"
          />
        </Link>
        <div className="postUserinfo">
          <span className="postUsername">{post.username}</span>
          <span className="postedTime">{format(post.createdAt)}</span>
        </div>
        <Share className="sharePost" />
      </div>
      <hr className="hr" />
      <div className="postMiddlePart">
        <span className="postDescription">{post.description}</span>
      </div>
      <hr className="hr" />
      <div className="postBottomPart">
        <img
          src={PF + 'images/thumbsup.png'}
          alt=""
          className="likeIcon"
          onClick={likeHandler}
        />
        <img src={PF + 'images/comment.png'} alt="" className="likeIcon" />
        <span className="noOfComments">
          {likes} likes, {post.comments || 0} comments
        </span>
      </div>
    </div>
  );
}
