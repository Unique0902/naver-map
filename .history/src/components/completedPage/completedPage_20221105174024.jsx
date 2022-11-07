import React from 'react';
import styles from './completedPage.module.css';

const CompletedPage = ({ opponentUserData }) => {
  const { name, sex, uid } = opponentUserData;
  return (
    <section className={styles.body}>
      <section className={styles.textSec}>
        <p className={styles.text}>{`${name}님과의 약속이 완료되었어요!`}</p>
      </section>
      <section className={styles.btns}>
        <button className={styles.backBtn}>이전</button>
        <button className={styles.homeBtn}>홈으로</button>
      </section>
    </section>
  );
};

export default CompletedPage;
