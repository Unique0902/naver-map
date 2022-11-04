import React from 'react';
import styles from './promiseCheck.module.css';
import { useState } from 'react';
const PromiseCheck = ({ promisingLoc, promisingTime }) => {
  return (
    <section className={styles.checkSec}>
      <h2 className={styles.title}>약속 정보를 확인해주세요.</h2>
      <p className={styles.loc}>{promisingLoc}</p>
      <p
        className={styles.time}
      >{`${promisingTime.bigTime} ${promisingTime.hour} ${promisingTime.minute}`}</p>
    </section>
  );
};

export default PromiseCheck;
