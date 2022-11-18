import React from 'react';
import styles from './radSelectBox.module.css';

const RadSelectBox = ({ radiusSelectRef, changeUserRadius }) => {
  return (
    <section className={styles.radiusSec}>
      <p className={styles.radiusTitle}>영역 반지름</p>
      <select
        className={styles.radiusSelect}
        ref={radiusSelectRef}
        onChange={() => {
          changeUserRadius();
        }}
      >
        <option value='50m'>50m</option>
        <option value='100m'>100m</option>
        <option value='200m' selected>
          200m
        </option>
        <option value='500m'>500m</option>
      </select>
    </section>
  );
};

export default RadSelectBox;
