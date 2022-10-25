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
  const chattingSecRef = useRef();
  return (
    <>
      <section className={styles.chattingSec} ref={chattingSecRef}>
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
          chatService={chatService}
          userId={userId}
          roomId={roomId}
          chattingSecRef={chattingSecRef}
        />
      </section>
    </>
  );
};

export default Chats;
