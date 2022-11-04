import React from 'react';
import styles from './lowBtns.module.css';

const LowBtns = ({ selectBack, onMatchingStart }) => {
  return (
    <section className={styles.lowBtns}>
      <div className={styles.lowSecBtns}>
        <div className={styles.lowTopBtns}>
          <button
            className={`${styles.lowTopBtn} ${styles.lowBtn}`}
            onClick={() => {
              selectBack('amendStart');
            }}
          >
            출발
          </button>
          <button
            className={`${styles.lowTopBtn} ${styles.lowBtn}`}
            onClick={() => {
              selectBack('amendArrive');
            }}
          >
            도착
          </button>
        </div>
        <button
          className={`${styles.lowMatchingBtn} ${styles.lowBtn}`}
          onClick={() => {
            onMatchingStart();
          }}
        >
          매칭하기
        </button>
      </div>
    </section>
  );
};

export default LowBtns;
