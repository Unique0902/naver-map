import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './completedPage.module.css';

const CompletedPage = ({ opponentUserData: { uid, name, sex } }) => {
  const [isShowEvaluation, setIsShowEvaluation] = useState(false);
  useEffect(() => {
    if (!isShowEvaluation) {
      setIsShowEvaluation(true);
    }
  }, []);
  return (
    <section className={styles.body}>
      {!isShowEvaluation && (
        <section className={styles.textSec}>
          <p className={styles.text}>
            <p className={styles.nickname}>{`${name}`}</p>
            {`님과의 약속이 완료되었어요!`}
          </p>
        </section>
      )}
      {isShowEvaluation && (
        <section className={styles.evaluationSec}>
          <button>평가하기</button>
          <button>후기작성</button>
        </section>
      )}
      <section className={styles.btns}>
        <button className={styles.backBtn}>이전</button>
        <button className={styles.homeBtn}>홈으로</button>
      </section>
    </section>
  );
};

export default CompletedPage;
