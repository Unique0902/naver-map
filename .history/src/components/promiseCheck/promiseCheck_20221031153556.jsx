import React from 'react';
import styles from './promiseCheck.module.css';
import { useState } from 'react';
const PromiseCheck = ({ promisingLoc, promisingTime }) => {
  return (
    <section className={styles.timeSec}>
      <h2 className={styles.title}>약속시간</h2>
    </section>
  );
};

export default PromiseCheck;
