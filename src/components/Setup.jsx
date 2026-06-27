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
