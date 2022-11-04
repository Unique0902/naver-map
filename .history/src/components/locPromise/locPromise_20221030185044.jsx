import React from 'react';
import styles from './locPromise.module.css';
import { useState } from 'react';
const LocPromise = (props) => {
  return (
    <section className={styles.locSec}>
      <h2 className={styles.title}>약속위치</h2>
      <input
        type='text'
        placeholder='예:OO초등학교 앞, OO편의점 앞 도로'
        className={styles.input}
      />
    </section>
  );
};

export default LocPromise;
