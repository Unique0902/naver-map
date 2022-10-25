import React from 'react';
import styles from './msgSendForm.module.css';
import sendBtnImg from '../../images/sendBtn.png';

const MsgSendForm = (props) => {
  return (
    <div className={styles.msgForm}>
      <input
        type='text'
        className={styles.chatInform}
        placeholder={'메세지를 남겨보세요!'}
      />
      <button className={styles.chatBtn}>
        <img src={sendBtnImg} alt='' className={styles.sendBtn} />
      </button>
    </div>
  );
};

export default MsgSendForm;
