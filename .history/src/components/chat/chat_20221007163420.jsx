import React from 'react';
import styles from './chat.module.css';

const Chat = ({ chatting: { id, chat, isMe, time, img } }) => {
  return <div>{chatting.isMe ? <section></section> : <div></div>}</div>;
};

export default Chat;
