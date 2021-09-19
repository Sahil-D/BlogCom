import './feed.css';
import Share from '../Share/Share';
import Post from '../Post/Post';
import { Axios } from '../../config';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';

export default function Feed({ profile, profileUsername }) {
  const [posts, setPosts] = useState([]);
  const [fetchingFeed, setFetchingFeed] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);

  const { user, reloadFeed, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = profile
          ? await Axios.get(`/post/profile/${profileUsername}`)
          : await Axios.get(`/post/timeline/${user._id}`);
        const unsortedPosts = res.data.data;
        setPosts(
          unsortedPosts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        setFetchingFeed(false);
      } catch (err) {
        setFetchingFeed(false);
        setErrorFetching(true);
      }
    };
    fetchPosts();
  }, [profile, profileUsername, user._id]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setFetchingFeed(true);
        const res = profile
          ? await Axios.get(`/post/profile/${profileUsername}`)
          : await Axios.get(`/post/timeline/${user._id}`);
        const unsortedPosts = res.data.data;
        setPosts(
          unsortedPosts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        setFetchingFeed(false);
      } catch (err) {
        setFetchingFeed(false);
        setErrorFetching(true);
      }
    };
    if (reloadFeed) {
      fetchPosts();
      dispatch({ type: 'RESET_RELOAD_FEED' });
    }
  }, [dispatch, profile, profileUsername, reloadFeed, user._id]);

  if (fetchingFeed || errorFetching) {
    return (
      <div className="feed">
        {profile ? null : <Share />}
        {fetchingFeed ? (
          <div className="fetchingCircle">
            <CircularProgress
              size="30px"
              color="inherit"
              style={{ alignSelf: 'center' }}
            />
          </div>
        ) : (
          <div className="fetchingCircle">Error Fetching Posts !!!!</div>
        )}
      </div>
    );
  }

  return (
    <div className="feed">
      {profile ? null : <Share />}

      {!posts.length ? (
        <div className="makeFriendsText">
          {profile
            ? 'Your All Posts will be visible here.'
            : 'Your Friends Posts will be visible here.'}
        </div>
      ) : (
        posts.map((p, index) => {
          return <Post key={index.toString()} post={p} />;
        })
      )}
    </div>
  );
}
