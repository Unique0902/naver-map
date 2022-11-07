import React from 'react';
import styles from './evalMenu.module.css';

const EvalMenu = (props) => {
  return (
    <section className={styles.valBtnSec}>
      <button className={styles.valBtn}>비매너평가</button>
      <button className={styles.valBtn}>후기작성</button>
      <button className={styles.valBtn}>신고</button>
    </section>
  );
};

export default EvalMenu;
