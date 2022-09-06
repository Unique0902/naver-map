import React, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import styles from './daum.module.css';

const Daum = ({ searchAddressToCoordinate, setShowdaum }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    searchAddressToCoordinate(fullAddress);
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setShowdaum(false);
    //fullAddress -> 전체 주소반환
  };
  const themeObj = {
    //bgColor: "", //바탕 배경색
    searchBgColor: '#0B65C8', //검색창 배경색
    //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    //pageBgColor: "", //페이지 배경색
    //textColor: "", //기본 글자색
    queryTextColor: '#FFFFFF', //검색창 글자색
    //postcodeTextColor: "", //우편번호 글자색
    //emphTextColor: "", //강조 글자색
    //outlineColor: "", //테두리
  };
  return (
    <DaumPostCode
      onComplete={handleComplete}
      className='post-code daum'
      theme={themeObj}
      width={150}
    />
  );
};
export default Daum;
