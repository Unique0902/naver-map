import React from 'react';
import styles from './msgSendForm.module.css';
import sendBtnImg from '../../images/sendBtn.png';
import { useRef } from 'react';

const MsgSendForm = ({ chatService, userId, roomId }) => {
  const chatRef = useRef();
  return (
    <div className={styles.msgForm}>
      <input
        type='text'
        ref={chatRef}
        className={styles.chatInform}
        placeholder={'메세지를 남겨보세요!'}
      />
      <button
        onClick={() => {
          const text = chatRef.current.value;
          chatService.postChat({ text, userId, roomId }).then(() => {
            chatRef.current.value = '';
          });
        }}
        className={styles.chatBtn}
      >
        <img src={sendBtnImg} alt='' className={styles.sendBtn} />
      </button>
    </div>
  );
};

export default MsgSendForm;
