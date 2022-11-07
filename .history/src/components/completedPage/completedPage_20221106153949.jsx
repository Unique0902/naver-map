import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './completedPage.module.css';

const CompletedPage = ({ opponentUserData: { uid, name, sex } }) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  return (
    <section className={styles.body}>
      <section className={styles.textSec}>
        <p className={styles.text}>
          <p className={styles.nickname}>{`${name}`}</p>
          {`님과의 약속이 완료되었어요!!`}
        </p>
      </section>

      <section className={styles.evaluationSec}>
        <section className={styles.praiseSec}>
          <h3 className={styles.praiseTitle}>어떤점이 좋았나요?</h3>
          <div className={styles.praise}>
            <div
              className={`${styles.checkBox} ${
                isChecked1 ? styles.checked : styles.notChecked
              }`}
            />
            <p className={styles.praiseText}>친절하고 매너가 좋아요.</p>
          </div>
          <div className={styles.praise}>
            <div
              className={`${styles.checkBox} ${
                isChecked2 ? styles.checked : styles.notChecked
              }`}
            />
            <p className={styles.praiseText}>시간 약속을 잘 지켜요.</p>
          </div>
          <div className={styles.praise}>
            <div
              className={`${styles.checkBox} ${
                isChecked3 ? styles.checked : styles.notChecked
              }`}
              onClick={() => {}}
            />
            <p className={styles.praiseText}>응답이 빨라요.</p>
          </div>
        </section>
        <section className={styles.valBtnSec}>
          <button>평가하러가기</button>
          <button>후기작성하러가기</button>
        </section>
      </section>

      <section className={styles.btns}>
        <button className={styles.backBtn}>이전</button>
        <button className={styles.homeBtn}>홈으로</button>
      </section>
    </section>
  );
};

export default CompletedPage;
