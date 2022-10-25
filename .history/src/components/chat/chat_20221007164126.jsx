import React from 'react';
import styles from './chat.module.css';

const Chat = ({ chatting: { id, chat, isMe, time, img } }) => {
  return (
    <div>
      {isMe ? (
        <div className={styles.chat}>
          <div className={styles.time}>{time}</div>
          <div className={`${styles.text} ${styles.myColor}`}>{chat}</div>
        </div>
      ) : (
        <div className={styles.chat}>
          <img src={img} alt='' className={styles.userImg} />
          <div className={`${styles.text} ${styles.otherColor}`}>{chat}</div>
          <div className={styles.time}>{time}</div>
        </div>
      )}
    </div>
  );
};

export default Chat;
