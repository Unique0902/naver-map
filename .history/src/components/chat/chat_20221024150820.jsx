import React from 'react';
import styles from './chat.module.css';

const Chat = ({ chatting: { id, roomId, text, createdAt, isMe, userId } }) => {
  return (
    <>
      {isMe ? (
        <div className={styles.chat}>
          <div className={styles.timeSec}>
            <div className={styles.time}>{createdAt}</div>
          </div>
          <div className={`${styles.text} ${styles.myColor}`}>{text}</div>
        </div>
      ) : (
        <div className={styles.chat}>
          <div className={styles.imgSec}>
            <img src={img} alt='' className={styles.userImg} />
          </div>
          <div className={`${styles.text} ${styles.otherColor}`}>{chat}</div>
          <div className={styles.timeSec}>
            <div className={styles.time}>{time}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
