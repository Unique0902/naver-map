import React from 'react';
import styles from './locPromise.module.css';
import { useState } from 'react';
const LocPromise = (props) => {
  return (
    <section className={styles.locSec}>
      <h2 className={styles.title}>μ½μμμΉ</h2>
      <input type='text' />
    </section>
  );
};

export default LocPromise;
