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
      <section className={styles.btnSec}>
        {promiseLev === 'loc' ? (
          <>
            <button
              className={styles.nextBtn}
              onClick={() => {
                setPromiseLev('time');
              }}
            >
              다음
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.beforeBtn}
              onClick={() => {
                setPromiseLev('loc');
              }}
            >
              이전
            </button>
            <button className={styles.promiseBtn}>약속결정</button>
          </>
        )}
      </section>
    </section>
  );
};

export default PromiseSec;
