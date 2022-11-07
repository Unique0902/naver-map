import React from 'react';
import styles from './completedPage.module.css';

const CompletedPage = ({ opponentUserData }) => {
  return (
    <section className={styles.body}>
      <p>{`${opponentUserData.name}님과의 약속이 완료되었어요!`}</p>
      <div className={styles.btns}>
        <button className={styles.backBtn}>이전</button>
        <button className={styles.homeBtn}>홈으로</button>
      </div>
    </section>
  );
};

export default CompletedPage;
