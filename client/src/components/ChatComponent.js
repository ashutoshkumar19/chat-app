import React, { useState, useEffect } from 'react';

import { generateId } from './Functions';

const elementId = generateId(5);

function ChatComponent({ socket, userState, to_name, status }) {
  const { name, color } = userState;

  const [message, setMessage] = useState('');

  const [chat, setChat] = useState([]);

  const [chatListElements, setChatListElements] = useState('');

  const [isConnected, setIsConnected] = useState(false);

  // Watch the socket to update chats and get notified
  useEffect(() => {
    socket.on('sent_message', (sent_to_name, name, message, color) => {
      if (to_name === sent_to_name) {
        // console.log('To Name: ' + to_name + '\nSent To Name: ' + sent_to_name);
        setChat((prevChats) => [...prevChats, { name, message, color }]);
      }
    });

    socket.on('received_message', (received_from_name, message, color) => {
      if (received_from_name === to_name) {
        // console.log('From Name: ' + received_from_name + '\nTo Name: ' + to_name);
        setChat((prevChats) => [
          ...prevChats,
          { name: received_from_name, message: message, color: color },
        ]);
      }
    });

    socket.on('join_notify', (name) => {
      if (name === to_name) {
        console.log(name + ' joined the chat');
        setIsConnected(true);
        socket.emit('join_notify_acknowledge', to_name, userState.name);
      }
    });
    socket.on('join_notify_acknowledge', (name) => {
      if (name === to_name) {
        console.log(name + ' joined the chat');
        setIsConnected(true);
      }
    });
    socket.on('leave_notify', (name) => {
      if (name === to_name) {
        console.log(name + ' left the chat');
        setIsConnected(false);
      }
    });
  }, []);

  // Update chatListElements when chat changes
  useEffect(() => {
    const all_chats = chat.map(({ name, message, color }, index) => (
      <div
        key={index}
        className={`chat-bubble ${name === userState.name ? ' right' : ''}`}
      >
        <p className='username' style={{ color: `${color}` }}>
          {name}
        </p>
        <p className='message'>{message}</p>
      </div>
    ));
    setChatListElements(all_chats);
    setTimeout(() => {
      var element = document.getElementById('chat-list-' + elementId);
      element.scrollTop = element.scrollHeight;
    }, 50);
  }, [chat]);

  // Notify others if user join or left the chat
  useEffect(() => {
    if (status === 1) {
      socket.emit('join_notify', to_name, name);
    } else {
      socket.emit('leave_notify', to_name, name);
    }
  }, [status]);

  // onChange
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle message submit
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const nameText = name.trim();
    const messageText = message.trim();
    if (nameText.length > 0) {
      if (messageText.length > 0) {
        socket.emit('private_message', to_name, name, message, color);
        setMessage('');
      }
    } else {
      alert('Please enter a name !');
    }
  };

  return (
    <div
      className='chat-box-container'
      style={status === 0 ? { display: 'none' } : { display: 'block' }}
    >
      <div className='chat-box'>
        <div className='chat-list-container'>
          <div className='heading'>
            <p>{to_name}</p>

            <div className='details-box'>
              {isConnected ? (
                <p className='joined'>Joined the chat</p>
              ) : (
                <p className='left'>Left the chat</p>
              )}
            </div>
          </div>

          <div className='chat-list' id={`chat-list-` + elementId}>
            {chatListElements}
          </div>
        </div>

        <div className='chat-form'>
          <form onSubmit={onMessageSubmit}>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => onChange(e)}
              placeholder='Type a message...'
            />
            <button type='submit'>
              <span class='material-icons'>send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
