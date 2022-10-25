import React from 'react';
import Chat from '../chat/chat';
import styles from './chats.module.css';
import MsgSendForm from '../msgSendForm/msgSendForm';

const Chats = ({
  chattingArr,
  setChattingArr,
  chatService,
  userId,
  roomId,
}) => {
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
        <MsgSendForm
          chattingArr={chattingArr}
          setChattingArr={setChattingArr}
          chatService={chatService}
          userId={userId}
          roomId={roomId}
        />
      </section>
    </>
  );
};

export default Chats;
