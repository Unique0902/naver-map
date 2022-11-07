import React from 'react';
import styles from './evalMenu.module.css';

const EvalMenu = (props) => {
  return (
    <section className={styles.menu}>
      <button className={styles.select}>비매너평가</button>
      <button className={styles.select}>후기작성</button>
      <button className={styles.select}>신고</button>
    </section>
  );
};

export default EvalMenu;
