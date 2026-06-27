import React from 'react';

export default function PoliciesModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="glass-panel modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>개인정보 처리방침 및 이용약관</h2>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <h3 style={{ color: '#fcd34d', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. 개인정보 처리방침</h3>
          <p>본 서비스(우리 반 칭찬 스티커판)는 교사의 학급 경영 및 긍정 행동 강화를 돕기 위해 개발된 교육용 웹 애플리케이션으로, 개인정보보호위원회의 「개인정보 처리방침 작성지침」을 준수하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
          
          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제1조 (개인정보의 처리 목적)</h4>
          <p>본 서비스는 교사의 원활한 학급 운영(학생별/모둠별 칭찬 내역 기록 및 조회)을 목적으로 최소한의 개인정보를 처리합니다. 본 목적 이외의 용도로는 사용되지 않습니다.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제2조 (처리하는 개인정보의 항목)</h4>
          <p>필수 항목: 학생 성명, 번호(또는 학번), 소속 모둠, 칭찬 사유 및 내용, 칭찬 부여 날짜</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제3조 (개인정보의 처리 및 보유 기간)</h4>
          <p>수집된 개인정보는 당해 학년도(또는 학기) 종료 시점까지 보유 및 이용됩니다. 보유 목적 달성 또는 다음 학년도 시작 전, 교사는 시스템의 기능('모든 데이터 초기화')을 통해 데이터를 영구 파기해야 합니다.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제4조 (개인정보의 파기 절차 및 방법)</h4>
          <p>파기절차: 보존 기간이 경과하거나 목적이 달성된 개인정보는 내부 방침에 따라 지체 없이 파기됩니다.<br/>파기방법: 본 서비스는 데이터를 외부 서버에 저장하지 않고 교사의 PC 브라우저 내부(Local Storage)에 저장합니다. 앱 내의 '모든 데이터 초기화' 버튼을 누르거나, 브라우저의 저장소를 삭제하면 복구할 수 없는 방식으로 영구 파기됩니다.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제5조 (개인정보의 제3자 제공 및 위탁)</h4>
          <p>본 서비스는 정보주체의 개인정보를 외부에 제공하거나 처리 업무를 위탁하지 않습니다. 모든 데이터는 온전히 교사 본인의 기기에만 보관됩니다.</p>

          <hr style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '2rem 0' }} />

          <h3 style={{ color: '#fcd34d', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. 서비스 이용약관</h3>
          <p>본 이용약관(이하 '약관')은 '우리 반 칭찬 스티커판'(이하 '본 서비스')이 제공하는 교육용 웹 애플리케이션 서비스의 이용에 관한 사항을 규정합니다.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제1조 (목적)</h4>
          <p>이 약관은 본 서비스가 제공하는 무료 교육용 웹 애플리케이션 서비스(이하 '서비스')를 이용함에 있어 서비스 제공자와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제2조 (정의)</h4>
          <p>1. '서비스'란 본 플랫폼에서 제공하는 교육용 웹 애플리케이션을 말합니다.<br/>2. '이용자'란 본 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원(교사 및 학생)을 말합니다.<br/>3. '회원'이란 본 서비스에 회원등록을 한 자로서, 서비스를 이용할 수 있는 자를 말합니다. (단, 현재 버전은 별도 가입 절차 없는 교사 단독 사용을 원칙으로 합니다.)</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제8조 (이용자의 의무)</h4>
          <p>이용자는 다음 행위를 하여서는 안 됩니다.<br/>1. 허위 내용의 등록<br/>2. 타인의 정보 도용<br/>3. 서비스에 게시된 정보의 무단 변경<br/>4. 서비스의 운영을 방해하는 행위<br/>5. 타인의 명예를 손상시키거나 불이익을 주는 행위<br/>6. 공서양속에 반하는 정보를 게시하는 행위<br/>7. 수집된 학생 개인정보를 교육 목적 외 사적/영리적 용도로 유출하는 행위</p>

          <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>제10조 (면책조항)</h4>
          <p>1. 본 서비스는 무료로 제공되는 교육용 서비스로서, 서비스 이용 중 발생하는 기술적 문제나 오류(로컬 스토리지 초기화로 인한 데이터 유실 등)에 대해 제한적 책임을 집니다.<br/>2. 본 서비스가 연결하는 외부 웹 애플리케이션의 내용에 대해서는 해당 애플리케이션 제공자가 책임을 집니다.</p>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className="btn-primary" onClick={onClose} style={{ padding: '0.8rem 2rem' }}>닫기</button>
        </div>
      </div>
    </div>
  );
}
