import React, { useState } from 'react';
import { useRef } from 'react';
import LocPromise from '../locPromise/locPromise';
import TimePromise from '../timePromise/timePromise';
import styles from './promiseSec.module.css';

const PromiseSec = ({
  promisingTime,
  setPromisingTime,
  promisingLoc,
  setPromisingLoc,
  promiseService,
}) => {
  const noww = new Date();
  noww.setHours(6);
  console.log(noww);
  const [promiseLev, setPromiseLev] = useState('loc');
  const locRef = useRef();
  return (
    <section className={styles.promiseSec}>
      <section className={styles.titleSec}>
        <h2 className={styles.title}>약속 정하기</h2>
      </section>
      <section className={styles.contentSec}>
        {promiseLev === 'loc' ? (
          <LocPromise
            promisingLoc={promisingLoc}
            setPromisingLoc={setPromisingLoc}
            locRef={locRef}
          />
        ) : (
          <TimePromise
            promisingTime={promisingTime}
            setPromisingTime={setPromisingTime}
          />
        )}
      </section>
      <section className={styles.btnSec}>
        {promiseLev === 'loc' ? (
          <>
            <button
              className={styles.nextBtn}
              onClick={() => {
                const loc = locRef.current.value;
                if (loc) {
                  setPromisingLoc(loc);
                }
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
            <button className={styles.promiseBtn} onClick={() => {}}>
              약속결정
            </button>
          </>
        )}
      </section>
    </section>
  );
};

export default PromiseSec;
