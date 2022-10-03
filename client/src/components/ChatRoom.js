import React, { useContext, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../styles/ChatRoom.css';
import { AppContext } from '../App';

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export default function ChatRoom() {
  const {
    name,
    room,
    message,
    setMessage,
    messages,
    setSigned,
    socket,
    usersKeys,
    pack,
    usersList,
  } = useContext(AppContext);

  const [expand, setExpand] = useState(false);

  const handleLeave = () => {
    setSigned(false);
    socket.emit('logout');
  };
  const handleExpand = (e) => {
    e.preventDefault();
    setExpand(!expand);
  };
  const sendHandler = (e) => {
    e.preventDefault();
    const plaintext = {
      name,
      time: formatAMPM(new Date()),
      message,
    };
    socket.emit('message', pack(plaintext, usersKeys));
    setMessage('');
  };

  return (
    <div>
      <div>
        <div>
          ROOM :{room}
          {expand ? (
            <button onClick={handleExpand}>Decrypt</button>
          ) : (
            <button onClick={handleExpand}>Encrypt</button>
          )}
        </div>
        <div>
          <div>
            <div>
              <div>Members list</div>
              {usersList.map((user) => (
                <div key={user}>{user}</div>
              ))}
            </div>
          </div>

          <div>
            <ScrollToBottom>
              {messages.map(({ m, t, n, e, k }) => (
                <div key={Math.random()}>
                  <div>
                    <span>{n}</span>
                    <br />
                    <span>{t}</span>
                  </div>
                  <div>{m}</div>
                  {expand && (
                    <div>
                      <div>
                        <span>
                          Encrypted message: <br />
                        </span>
                        {e.data}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ScrollToBottom>
            <div>
              <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  e.key === 'Enter' && sendHandler(e);
                }}
              ></input>
              <button onClick={sendHandler}>
                <span>Send</span>
              </button>
              <button className="logout" onClick={handleLeave}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
