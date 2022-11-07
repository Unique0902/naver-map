import React from 'react';
import styles from './evalMenu.module.css';

const EvalMenu = (props) => {
  return (
    <section className={styles.menu}>
      <button className={styles.select}>신고하기</button>
      <button className={styles.select}>비매너 평가하기</button>
      <button className={styles.select}>후기작성</button>
      <button className={styles.select}>이사람과 매칭되지않기</button>
    </section>
  );
};

export default EvalMenu;
