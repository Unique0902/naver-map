import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import EvalMenu from '../evalMenu/evalMenu';
import styles from './completedPage.module.css';

const CompletedPage = ({
  opponentUserData: { uid, name, sex },
  userDataService,
  roomId,
}) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isPraised, setIsPraised] = useState(false);
  const [praiseLoading, setPraiseLoading] = useState(false);
  const menuBtnRef = useRef();
  const menuBtnRef2 = useRef();
  const btnRef = useRef();
  const btnRef2 = useRef();
  const btnRef3 = useRef();
  const btnRef4 = useRef();
  return (
    <section
      className={styles.body}
      onClick={(e) => {
        if (isShowMenu) {
          if (
            e.target != btnRef.current &&
            e.target != btnRef2.current &&
            e.target != btnRef3.current &&
            e.target != btnRef4.current
          ) {
            setIsShowMenu(false);
          }
        }
      }}
    >
      <section className={styles.textSec}>
        <p className={styles.text}>
          <p className={styles.nickname}>{`${name}`}</p>
          {`님과의 약속 완료`}
        </p>
      </section>

      <section className={styles.evaluationSec}>
        <section className={styles.praiseSec}>
          <div className={styles.priaseTitleSec}>
            <h3 className={styles.praiseTitle}>어떤점이 좋았나요?</h3>
            <button
              className={styles.menu}
              ref={menuBtnRef}
              onClick={() => {
                setIsShowMenu(true);
              }}
            >
              <i
                ref={menuBtnRef2}
                className='fa-solid fa-ellipsis-vertical'
              ></i>
            </button>
            {isShowMenu && (
              <EvalMenu
                btnRef={btnRef}
                btnRef2={btnRef2}
                btnRef3={btnRef3}
                btnRef4={btnRef4}
              />
            )}
          </div>

          <div className={styles.praise}>
            <div
              className={`${styles.checkBox} ${
                isChecked1 ? styles.checked : styles.notChecked
              }`}
              onClick={() => {
                setIsChecked1(!isChecked1);
              }}
            />
            <p className={styles.praiseText}>친절하고 매너가 좋아요.</p>
          </div>
          <div className={styles.praise}>
            <div
              className={`${styles.checkBox} ${
                isChecked2 ? styles.checked : styles.notChecked
              }`}
              onClick={() => {
                setIsChecked2(!isChecked2);
              }}
            />
            <p className={styles.praiseText}>시간 약속을 잘 지켜요.</p>
          </div>
          <div className={styles.praise}>
            <div
              className={`${styles.checkBox} ${
                isChecked3 ? styles.checked : styles.notChecked
              }`}
              onClick={() => {
                setIsChecked3(!isChecked3);
              }}
            />
            <p className={styles.praiseText}>응답이 빨라요.</p>
          </div>
          {isPraised ? (
            <button className={styles.praiseBtn}>수정하기</button>
          ) : (
            <button
              className={styles.praiseBtn}
              onClick={() => {
                userDataService
                  .updatePraiseData(
                    uid,
                    isChecked1,
                    isChecked2,
                    isChecked3,
                    roomId
                  )
                  .then((data) => {
                    setIsPraised(true);
                  });
              }}
            >
              {!praiseLoading ? (
                <div className={styles.loading}></div>
              ) : (
                '칭찬하기'
              )}
            </button>
          )}
        </section>
      </section>

      <section className={styles.btns}>
        <button className={styles.backBtn}>추가 매칭</button>
        <button className={styles.homeBtn}>홈으로</button>
      </section>
    </section>
  );
};

export default CompletedPage;
