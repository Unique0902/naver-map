import React from 'react';
import styles from './locPromise.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
const LocPromise = ({ promisingLoc, setPromisingLoc, locRef }) => {
  useEffect(() => {
    if (promisingLoc) {
      locRef.current.value = promisingLoc;
    }
  }, []);
  return (
    <section className={styles.locSec}>
      <h2 className={styles.title}>약속위치</h2>
      <input
        type='text'
        ref={locRef}
        placeholder='예:OO초등학교 앞, OO편의점 앞 도로'
        className={styles.input}
      />
    </section>
  );
};

export default LocPromise;
