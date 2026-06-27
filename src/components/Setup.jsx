import React, { useState } from 'react';

export default function Setup({ onComplete }) {
  const [pin, setPin] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pin) {
      alert("PIN 번호를 입력해주세요.");
      return;
    }
    if (purpose !== 'teacher_only') {
      alert("현재 버전은 '교사 단독 행정·업무용'으로만 사용 가능합니다.");
      return;
    }
    // 간단한 인증 (실제 환경에서는 서버 또는 안전한 로컬 저장 처리 필요)
    if (pin === '1234') { // 기본 PIN 1234
      onComplete();
    } else {
      alert("올바르지 않은 PIN입니다. (초기 PIN: 1234)");
    }
  };

  return (
    <div className="setup-container">
      <div className="glass-panel setup-card">
        <h2 className="modal-title">우리 반 칭찬 스티커판 시작하기</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">사용 목적 체크리스트 (소프트웨어 교육 환경 심의 기준)</label>
            <label className="checkbox-label">
              <input 
                type="radio" 
                name="purpose" 
                value="teacher_only" 
                onChange={(e) => setPurpose(e.target.value)} 
              />
              <span className="checkbox-text">교사 단독 행정·업무용 (학생 접속 없음)</span>
            </label>
            <label className="checkbox-label">
              <input 
                type="radio" 
                name="purpose" 
                value="student_use" 
                onChange={(e) => setPurpose(e.target.value)} 
              />
              <span className="checkbox-text">정규 수업 중 학생 기기 사용</span>
            </label>
            <label className="checkbox-label">
              <input 
                type="radio" 
                name="purpose" 
                value="home_use" 
                onChange={(e) => setPurpose(e.target.value)} 
              />
              <span className="checkbox-text">가정/과제용 사용</span>
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label">교사 전용 접속 PIN (기본: 1234)</label>
            <input 
              type="password" 
              className="form-input" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="숫자 4자리"
            />
          </div>
          
          <button type="submit" className="btn-primary">입장하기</button>
        </form>
      </div>
    </div>
  );
}
