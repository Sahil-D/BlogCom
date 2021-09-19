import { useContext, useEffect, useRef, useState } from 'react';
import './messenger.css';
import { CircularProgress } from '@material-ui/core';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import { Send } from '@material-ui/icons';
import { AuthContext } from '../../context/AuthContext';
import { Axios } from '../../config';
import { io } from 'socket.io-client';

export default function Messenger() {
  const [conversations, setConversations] = useState([]); // conversations in chat Menu
  const [fetchingConversations, setFetchingConversations] = useState(true);
  const [errorFetchingConversations, setErrorFetchingConversations] =
    useState(false);
  const [currentChat, setCurrentChat] = useState(null); // chat window -> initially none
  const [messages, setMessages] = useState([]); // messages in chatBox
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [errorFetchingMessages, setErrorFetchingMessages] = useState(false);
  const [messageToSend, setMessageToSend] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null); // message received via socket
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  const scrollRef = useRef(); // for automatic scrolling to recent message in any chat
  const { user } = useContext(AuthContext);

  // getting a socketId just once at render
  useEffect(() => {
    socket.current = io('http://localhost:8900'); // URI at which chat server listening

    // getting new message via socket
    socket.current.on('getMessage', ({ senderId, text }) => {
      setArrivalMessage({
        senderId: senderId,
        text: text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // whenever a user connect "himself"
  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // change message list on every change in arrivalMessage
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((oldMessages) => [...oldMessages, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await Axios.get(`/conversation/${user._id}`); // current user
        setConversations(res.data.data);
        setFetchingConversations(false);
      } catch (err) {
        console.log(err);
        setFetchingConversations(false);
        setErrorFetchingConversations(true);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setFetchingMessages(true);
        setErrorFetchingMessages(false);
        const res = await Axios.get(`/message/${currentChat?._id}`); // current user
        setMessages(res.data.data);
        setFetchingMessages(false);
      } catch (err) {
        console.log(err);
        setFetchingMessages(false);
        setErrorFetchingMessages(true);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const msg = {
      senderId: user._id,
      conversationId: currentChat?._id,
      text: messageToSend,
    };

    try {
      const res = await Axios.post('/message', msg);
      // send message instantly using socket
      socket.current.emit('sendMessage', {
        senderId: user?._id,
        receiverId: currentChat?.members.find((mem) => mem !== user?._id),
        text: messageToSend,
      });
      setMessages([...messages, res.data.data]);
      setMessageToSend('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <>
      <Topbar messengerScreen={true} />
      <div className="messengerWrapper">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              className="menuInput"
              placeholder="Search Friend"
            />
            {fetchingConversations || errorFetchingConversations ? (
              <div>
                {fetchingConversations ? (
                  <div className="fetchingCircle">
                    <CircularProgress size="12px" color="inherit" />
                  </div>
                ) : (
                  <span className="errorMsg">Error fetching Conversations</span>
                )}
              </div>
            ) : (
              <>
                {!conversations.length ? (
                  <div> No followers or followings for conversation </div>
                ) : (
                  conversations.map((conv, index) => (
                    <div
                      className={
                        currentChat === conv
                          ? 'conversationDiv selected'
                          : 'conversationDiv'
                      }
                      onClick={() => setCurrentChat(conv)}
                      key={index.toString()}
                    >
                      <Conversation
                        conversation={conv}
                        currentUser={user}
                        usersOnline={onlineUsers}
                      />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                {fetchingMessages || errorFetchingMessages ? (
                  <div className="noCurrentChat">
                    {fetchingMessages ? (
                      <div className="fetchingCircle">
                        <CircularProgress size="14px" color="inherit" />
                      </div>
                    ) : (
                      <span className="errorMsg">Error fetching Messages</span>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="chatBoxTop">
                      {!messages.length ? (
                        <div className="noMessages">
                          Send any message to start conversation
                        </div>
                      ) : (
                        messages.map((mes, index) => (
                          <div key={index.toString()} ref={scrollRef}>
                            <Message message={mes} />
                          </div>
                        ))
                      )}
                    </div>
                    <div className="chatBoxBottom">
                      <input
                        placeholder="Write message here."
                        className="messageBody"
                        onChange={(event) =>
                          setMessageToSend(event.target.value)
                        }
                        value={messageToSend}
                      />
                      <div className="buttonSection">
                        <button
                          className="sendMessageButton"
                          onClick={handleSendMessage}
                        >
                          <Send />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="noCurrentChat">
                Choose Friend from the side list to chat with.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
