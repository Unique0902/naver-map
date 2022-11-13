import React from 'react';
import styles from './chat.module.css';
import sendBtnImg from '../../images/sendBtn.png';

const Chat = ({
  chatting: { id, roomId, text, createdAt, isMe, userId, date, time },
}) => {
  return (
    <>
      {userId == 'admin' ? (
        <div className={styles.notice}>
          <div className={`${styles.text}`}>{text}</div>
        </div>
      ) : isMe ? (
        <div className={styles.chat}>
          <div className={styles.timeSec}>
            <div className={styles.time}>{time}</div>
          </div>
          <div className={`${styles.text} ${styles.myColor}`}>{text}</div>
        </div>
      ) : (
        <div className={styles.chat}>
          <div className={styles.imgSec}>
            <img src={sendBtnImg} alt='' className={styles.userImg} />
          </div>
          <div className={`${styles.text} ${styles.otherColor}`}>{text}</div>
          <div className={styles.timeSec}>
            <div className={styles.time}>{time}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;