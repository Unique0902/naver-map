import React from 'react';
import Chat from '../chat/chat';
import styles from './chats.module.css';
import sendBtnImg from '../../images/sendBtn.png';

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
      </section>
    </>
  );
};

export default Chats;
