import React from 'react';
import styles from './promiseSec.module.css';

const PromiseSec = (props) => {
  return (
    <section className={styles.promiseSec}>
      <section className={styles.titleSec}>
        <h2 className={styles.title}>약속 정하기</h2>
      </section>
      <button>약속결정</button>
    </section>
  );
};

export default PromiseSec;
