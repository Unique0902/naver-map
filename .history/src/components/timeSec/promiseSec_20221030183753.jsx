import React, { useState } from 'react';
import LocPromise from '../locPromise/locPromise';
import TimePromise from '../timePromise/timePromise';
import styles from './promiseSec.module.css';

const PromiseSec = ({
  promisingTime,
  setPromisingTime,
  promisingLoc,
  setPromisingLoc,
}) => {
  const [promiseLev, setPromiseLev] = useState('loc');
  return (
    <section className={styles.promiseSec}>
      <section className={styles.titleSec}>
        <h2 className={styles.title}>약속 정하기</h2>
      </section>
      <section className={styles.contentSec}>
        {promiseLev === 'loc' ? <LocPromise /> : <TimePromise />}
      </section>
      <button className={styles.btn}>약속결정</button>
    </section>
  );
};

export default PromiseSec;
