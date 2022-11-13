import React from 'react';
import styles from './promiseCheck.module.css';
import { useState } from 'react';
const PromiseCheck = ({
  promisingStartLoc,
  promisingArriveLoc,
  promisingTime,
}) => {
  return (
    <section className={styles.checkSec}>
      <h2 className={styles.title}>약속 정보를 확인해주세요</h2>
      <div className={styles.loc}>
        <p className={styles.miniTitle}>약속 출발 장소:</p>
        <p className={styles.text}>{promisingStartLoc}</p>
      </div>
      <div className={styles.loc}>
        <p className={styles.miniTitle}>약속 도착 장소:</p>
        <p className={styles.text}>{promisingArriveLoc}</p>
      </div>
      <div className={styles.time}>
        <p className={styles.miniTitle}>약속시간:</p>
        <p
          className={styles.text}
        >{`${promisingTime.bigTime} ${promisingTime.hour}시 ${promisingTime.minute}분`}</p>
      </div>
    </section>
  );
};

export default PromiseCheck;
