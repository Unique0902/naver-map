import React from 'react';
import Chat from '../chat/chat';
import styles from './chats.module.css';
import MsgSendForm from '../msgSendForm/msgSendForm';
import { useRef } from 'react';

const Chats = ({
  chattingArr,
  setChattingArr,
  chatService,
  userId,
  roomId,
}) => {
  const chatsRef = useRef();
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
                채팅을 통해 약속 위치와 시간을 정해보세요.
              </div>
            </div>
          )}
          <div ref={chatsRef}></div>
        </section>
        <MsgSendForm
          chatService={chatService}
          userId={userId}
          roomId={roomId}
          chatsRef={chatsRef}
          chattingArr={chattingArr}
        />
      </section>
    </>
  );
};

export default Chats;
