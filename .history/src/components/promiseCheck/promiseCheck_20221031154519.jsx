import React from 'react';
import styles from './promiseCheck.module.css';
import { useState } from 'react';
const PromiseCheck = ({ promisingLoc, promisingTime }) => {
  return (
    <section className={styles.checkSec}>
      <h2 className={styles.title}>약속 정보를 확인해주세요.</h2>
      <div className={styles.loc}>
        <p className={styles.miniTitle}>약속장소:</p>
        <p className={styles.locText}>{promisingLoc}</p>
      </div>
      <div className={styles.time}>
        <p className={styles.miniTitle}>약속시간:</p>
        <p
          className={styles.timeText}
        >{`${promisingTime.bigTime} ${promisingTime.hour} ${promisingTime.minute}`}</p>
      </div>
    </section>
  );
};

export default PromiseCheck;
