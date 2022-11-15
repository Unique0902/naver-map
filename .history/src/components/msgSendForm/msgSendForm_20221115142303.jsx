import React from 'react';
import styles from './msgSendForm.module.css';
import sendBtnImg from '../../images/sendBtn.png';
import { useRef } from 'react';
import { useEffect } from 'react';

const MsgSendForm = ({
  chatService,
  userId,
  roomId,
  chatsRef,
  chattingArr,
}) => {
  const chatRef = useRef();
  useEffect(() => {
    chatsRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [chattingArr]);
  return (
    <form className={styles.msgForm}>
      <input
        type='text'
        ref={chatRef}
        className={styles.chatInform}
        placeholder={'메세지를 남겨보세요!'}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          let nowTime = new Date();
          const time = nowTime.toLocaleTimeString();
          const date = nowTime.toLocaleDateString();
          const text = chatRef.current.value;
          chatRef.current.value = '';

          chatService
            .postChat({ text, userId, roomId, date, time })
            .then(() => {});
        }}
        className={styles.chatBtn}
      >
        <img src={sendBtnImg} alt='' className={styles.sendBtn} />
      </button>
    </form>
  );
};

export default MsgSendForm;
