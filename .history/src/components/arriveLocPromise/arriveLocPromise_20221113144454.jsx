import React from 'react';
import styles from './arriveLocPromise.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
const ArriveLocPromise = ({
  promisingArriveLoc,
  setPromisingArriveLoc,
  arrivelocRef,
}) => {
  useEffect(() => {
    if (promisingArriveLoc) {
      arrivelocRef.current.value = promisingArriveLoc;
    }
  }, []);
  return (
    <section className={styles.locSec}>
      <h2 className={styles.title}>약속 도착 위치</h2>
      <input
        type='text'
        ref={arrivelocRef}
        placeholder='예:OO초등학교 앞, OO편의점 앞 도로'
        className={styles.input}
      />
    </section>
  );
};

export default ArriveLocPromise;
