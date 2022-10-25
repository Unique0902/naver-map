import React from 'react';
import Chat from '../chat/chat';
import styles from './chats.module.css';

const Chats = ({ chattingArr }) => {
  return (
    <>
      <section className={styles.chattingSec}>
        <section className={styles.chatsSec}>
          {chattingArr &&
            chattingArr.map((chatting) => (
              <Chat key={chatting.id} chatting={chatting} />
            ))}
          {chattingArr.length === 0 && (
            <div className={styles.noChatting}>
              <div className={styles.noChattingText}>
                채팅이 없습니다. 채팅을 남겨보세요.
              </div>
            </div>
          )}
        </section>
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
      </section>
    </>
  );
};

export default Chats;
