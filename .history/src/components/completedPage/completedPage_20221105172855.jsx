import React from 'react';
import styles from './completedPage.module.css';

const CompletedPage = ({ opponentUserData }) => {
  return (
    <section className={styles.body}>
      <p>{`${opponentUserData.name}님과의 약속이 완료되었어요!`}</p>
    </section>
  );
};

export default CompletedPage;
