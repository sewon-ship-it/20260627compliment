import React, { useState } from 'react';

export default function Setup({ onComplete }) {
  const [role, setRole] = useState(null); // 'teacher' | 'student'
  const [studentNumber, setStudentNumber] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleTeacherLogin = () => {
    // 실제 Firebase Auth 연동 시 이곳에 구현
    // prompt에 따라 "google 로그인하는 페이지랑(firebase auth)"를 구현해야 하나, 
    // 외부 패키지 금지 제약이 있으므로 UI만 Google 로그인 형태로 모의(Mock) 처리합니다.
    setRole('teacher');
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const num = parseInt(studentNumber, 10);
    if (num >= 1 && num <= 24) {
      setRole('student');
    } else {
      alert('1에서 24 사이의 본인 번호를 입력해주세요.');
    }
  };

  const handleAgreementSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("핵심 가이드 숙지 및 실천에 체크해 주세요.");
      return;
    }
    onComplete(role, role === 'student' ? studentNumber : null);
  };

  if (!role) {
    return (
      <div className="setup-container">
        <div className="glass-panel setup-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem' }}>로그인</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* 교사 로그인 영역 */}
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>👨‍🏫 교사 로그인</h3>
              <button 
                onClick={handleTeacherLogin}
                className="btn-primary" 
                style={{ width: '100%', padding: '0.8rem', background: '#4285F4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                Google 계정으로 로그인
              </button>
            </div>

            {/* 학생 로그인 영역 */}
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '1rem', color: '#10b981' }}>🎓 학생 로그인</h3>
              <form onSubmit={handleStudentLogin} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  min="1" 
                  max="24" 
                  placeholder="본인 번호 (1~24)" 
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                  required
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 1.5rem', background: '#10b981' }}>입장</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 동의 화면 (기존 Setup UI)
  return (
    <div className="setup-container">
      <div className="glass-panel setup-card" style={{ maxWidth: '700px', width: '100%' }}>
        <h2 className="modal-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>생성형 AI 윤리 핵심가이드</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem', maxHeight: '50vh', overflowY: 'auto', paddingRight: '1rem' }}>
          
          {/* 가이드 1 */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fcd34d', marginBottom: '0.5rem' }}>가이드 1. 생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요. (활용 목적)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              생성형 AI를 사용하기 전에 '지금 내가 왜 쓰려고 하지?'라고 스스로 물어보세요. 생성형 AI는 내 생각을 대신해주는 게 아니라, 내 생각을 도와주는 도구임을 기억하세요. 모든 공부에 생성형 AI가 필요한 것은 아니므로, 지금 하는 활동에 생성형 AI를 사용하는 것이 나의 학습에 정말 도움이 될지 먼저 고민해요.
            </p>
          </div>

          {/* 가이드 2 */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fcd34d', marginBottom: '0.5rem' }}>가이드 2. 생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요. (주도적 학습)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              막막할 때 바로 생성형 AI에게 묻고 싶은 마음이 들 수 있지만, 먼저 스스로 시도해 보아야 나의 성장에 도움이 돼요. 주제에 대해 내가 아는 것과 내 아이디어를 먼저 공책에 적거나 정리한 뒤에 생성형 AI를 활용하세요.
            </p>
          </div>

          {/* 가이드 3 */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fcd34d', marginBottom: '0.5rem' }}>가이드 3. 생성형 AI가 틀릴 수 있다는 점을 알아요. (비판적 검증)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              생성형 AI는 틀린 정보를 마치 사실인 것처럼 제시하기도 하므로, 알려준 내용은 항상 '정말 맞을까?' 하고 한 번 더 확인하는 습관을 가져요. 중요한 내용일수록 책을 찾아보거나 선생님께 여쭤보는 등 다른 방법으로도 꼭 다시 확인하세요.
            </p>
          </div>

          {/* 가이드 4 */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fcd34d', marginBottom: '0.5rem' }}>가이드 4. 생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요. (사고의 확장)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              생성형 AI를 내 생각의 범위를 넓혀주는 도구로 사용해보세요. 생성형 AI의 결과물을 그대로 사용하지 않고, 나의 경험과 생각을 더하여 나만의 색깔을 담은 최종 결과물을 만들어요.
            </p>
          </div>

          {/* 가이드 5 */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>가이드 5. 나의 정보와 비밀을 말하지 않아요. (안전과 관계)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              내가 입력한 정보는 어디에서 어떻게 사용될지 모르기 때문에 이름, 주소, 학교, 전화번호 같은 개인정보는 생성형 AI에게 알려주면 안돼요. 생성형 AI는 계산된 답변을 내놓는 프로그램이라 감정이 없어요. 나의 고민을 털어놓으며 지나치게 의지하기보다, 친구나 부모님, 선생님과의 실제 대화를 통해 마음을 나누어요.
            </p>
          </div>

          {/* 가이드 6 */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#6ee7b7', marginBottom: '0.5rem' }}>가이드 6. 생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요. (투명성·윤리)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              어느 부분이 생성형 AI의 것이고 어느 부분이 나의 것인지 명확히 밝히는 것은 나 자신을 속이지 않는 정직한 태도예요. 생성형 AI를 쓴 사실을 정직하게 밝힐 때 나의 노력이 더 빛나고 가치 있게 인정받을 수 있어요.
            </p>
          </div>

        </div>

        <form onSubmit={handleAgreementSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label className="checkbox-label" style={{ justifyContent: 'center', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            />
            <span className="checkbox-text" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>
              나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
            </span>
          </label>
          
          <button type="submit" className="btn-primary" style={{ padding: '1rem', fontSize: '1.1rem' }}>
            서약 및 본 활동 입장하기
          </button>
        </form>
      </div>
    </div>
  );
}
