import React from 'react';
import styles from './evalMenu.module.css';

const EvalMenu = ({ btnRef, btnRef2, btnRef3, btnRef4 }) => {
  return (
    <section className={styles.menu}>
      <button
        ref={btnRef}
        className={styles.select}
        onClick={() => {
          window.ReactNativeWebView.postMessage('report');
        }}
      >
        신고하기
      </button>
      <button
        ref={btnRef2}
        className={styles.select}
        onClick={() => {
          window.ReactNativeWebView.postMessage('badReview');
        }}
      >
        비매너 평가하기
      </button>
      <button
        ref={btnRef3}
        className={styles.select}
        onClick={() => {
          window.ReactNativeWebView.postMessage('review');
        }}
      >
        후기작성
      </button>
      <button ref={btnRef4} className={styles.select}>
        매칭차단
      </button>
    </section>
  );
};

export default EvalMenu;
