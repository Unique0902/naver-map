import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import EvalMenu from '../evalMenu/evalMenu';
import styles from './canceledPage.module.css';

const CanceledPage = ({
  opponentUserData: { uid, name, sex },
  userDataService,
  roomId,
  setNowSettingPos,
  setRoomId,
  changeMapHeight,
}) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [canClickBtn, setCanClickBtn] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isPraised, setIsPraised] = useState(false);
  const [praiseLoading, setPraiseLoading] = useState(false);
  const menuBtnRef = useRef();
  const menuBtnRef2 = useRef();
  const btnRef = useRef();
  const btnRef2 = useRef();
  const btnRef3 = useRef();
  const btnRef4 = useRef();
  const inputRef = useRef();
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
          {`님과의 약속 취소됨`}
        </p>
      </section>

      <section className={styles.evaluationSec}>
        <section className={styles.praiseSec}>
          <div className={styles.priaseTitleSec}>
            <h3 className={styles.praiseTitle}>어떤 문제가 있었나요?</h3>
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
            <p
              onClick={() => {
                setIsChecked1(!isChecked1);
              }}
              className={styles.praiseText}
            >
              상대방이 나오지 않아요.
            </p>
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
            <p
              onClick={() => {
                setIsChecked2(!isChecked2);
              }}
              className={styles.praiseText}
            >
              상대방이 일방적으로 약속을 취소했어요.
            </p>
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
            <p
              onClick={() => {
                setIsChecked3(!isChecked3);
              }}
              className={styles.praiseText}
            >
              다른 문제가 있어요.
            </p>
          </div>
          {isChecked3 && (
            <input
              className={styles.input}
              type='text'
              ref={inputRef}
              onChange={() => {
                if (inputRef.current.value) {
                  setCanClickBtn(true);
                } else {
                  setCanClickBtn(false);
                }
              }}
              placeholder='문제 작성'
            />
          )}

          {isPraised ? (
            <button
              className={`${styles.praiseBtn} ${
                canClickBtn ? styles.canClick : styles.cantClick
              }`}
              onClick={() => {
                if (canClickBtn) {
                  if (!praiseLoading) {
                    setPraiseLoading(true);
                    userDataService
                      .amendPraiseData(
                        uid,
                        isChecked1,
                        isChecked2,
                        isChecked3,
                        roomId
                      )
                      .then((data) => {
                        setPraiseLoading(false);
                      });
                  }
                }
              }}
            >
              {praiseLoading ? (
                <div className={styles.loading}></div>
              ) : (
                '수정하기'
              )}
            </button>
          ) : (
            <button
              className={`${styles.praiseBtn} ${
                canClickBtn ? styles.canClick : styles.cantClick
              }`}
              onClick={() => {
                if (canClickBtn) {
                  if (!praiseLoading) {
                    setPraiseLoading(true);
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
                        setPraiseLoading(false);
                      });
                  }
                }
              }}
            >
              {praiseLoading ? (
                <div className={styles.loading}></div>
              ) : (
                '제출하기'
              )}
            </button>
          )}
        </section>
      </section>

      <section className={styles.btns}>
        <button
          className={styles.backBtn}
          onClick={() => {
            setRoomId(null);
            setNowSettingPos('end');
            changeMapHeight(0.8);
          }}
        >
          추가 매칭
        </button>
        <button className={styles.homeBtn}>홈으로</button>
      </section>
    </section>
  );
};

export default CanceledPage;
