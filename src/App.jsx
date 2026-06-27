import React, { useState } from 'react';
import './App.css';
import { useStickerData } from './hooks/useStickerData';
import Setup from './components/Setup';
import Dashboard from './components/Dashboard';
import StickerBoard from './components/StickerBoard';
import Footer from './components/Footer';
import PolicyModal from './components/PolicyModal';

const PRIVACY_POLICY = `[개인정보 처리방침]

제1조 (개인정보의 처리 목적)
본 서비스는 교사의 학급 경영 및 학생 긍정 행동 강화를 위한 칭찬 내역 관리 목적으로만 개인정보를 처리합니다.

제2조 (처리하는 개인정보의 항목)
- 필수 항목: 학생 성명, 학번(또는 번호), 칭찬 내용, 칭찬 부여 날짜

제3조 (개인정보의 처리 및 보유 기간)
수집된 개인정보는 학년도(또는 학기) 종료 시점까지 보유하며, 목적 달성 또는 다음 학년도 시작 전 해당 데이터를 지체 없이 파기합니다. (본 앱은 로컬 브라우저 스토리지를 사용합니다)

제4조 (개인정보의 파기절차 및 방법)
- 파기절차: 교사가 학기 말 시스템 내 '데이터 전체 초기화' 기능을 통해 영구 삭제
- 파기방법: 복구할 수 없는 기술적 방법으로 전자적 파일 형태의 데이터 영구 삭제

제5조 (개인정보의 제3자 제공 및 위탁)
본 서비스는 수집된 개인정보를 외부 제3자에게 제공하거나 처리를 위탁하지 않습니다. 모든 데이터는 교사 본인의 기기에 로컬로 저장됩니다.

제6조 (안전성 확보 조치)
초기 입장 시 설정된 PIN 번호를 통해 교사 본인에게만 접근 권한을 부여하여 비인가자의 접근을 통제합니다.

제7조 (권리 행사 및 책임자)
학생 및 법정대리인은 언제든지 본인의 칭찬 기록에 대한 열람, 정정, 삭제를 담임 교사에게 요구할 수 있습니다.`;

const TERMS_OF_SERVICE = `[이용약관]

제1조 (목적 및 성격)
본 약관은 교사의 원활한 수업 준비 및 학급 행정업무 지원을 위해 제공되는 '칭찬 스티커판 서비스(이하 서비스)'의 이용 조건 및 절차를 규정함을 목적으로 합니다.

제2조 (이용 대상 및 계정)
본 서비스는 학급을 운영하는 교사 단독 사용을 원칙으로 합니다. 교사는 접속 비밀번호(PIN)를 안전하게 관리할 의무가 있습니다.

제3조 (디지털콘텐츠 이용 및 산출물 권리)
서비스를 통해 생성된 스티커판 등은 교사가 학급 내 교육적 목적으로 자유롭게 인쇄 및 사용할 수 있습니다.

제4조 (금지행위)
사용자는 본 서비스를 이용하여 타인의 명예를 훼손하거나, 학생의 개인정보를 교육 목적 외의 용도로 무단 유출해서는 안 됩니다.

제5조 (서비스 변경 및 책임 제한)
본 서비스는 기기 환경(브라우저 캐시 삭제 등)에 따라 데이터가 유실될 수 있으므로, 교사는 정기적으로 데이터 내보내기(백업) 기능을 이용해야 합니다. 데이터 유실에 따른 책임은 이용자에게 있습니다.

제6조 (분쟁 처리)
서비스 이용과 관련한 문의사항은 학급 담임 교사 및 관련 부서를 통해 처리합니다.`;

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('board'); // 'board' or 'dashboard'
  const [modalContent, setModalContent] = useState(null); // { title, content }
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const {
    students,
    addCompliment,
    updateStudentName,
    updateStudentGroup,
    clearData,
    exportData
  } = useStickerData();

  if (!isAuthorized) {
    return <Setup onComplete={() => setIsAuthorized(true)} />;
  }

  return (
    <div className="app-container">
      <header className="header no-print">
        <div className="header-title">우리 반 칭찬 스티커판 ✨</div>
        <nav className="header-nav">
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '1rem', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>월 선택:</label>
            <input 
              type="range" 
              min="1" max="12" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
              style={{ width: '100px' }}
            />
            <span style={{ fontWeight: 'bold' }}>{selectedMonth}월</span>
          </div>
          <button 
            className={`nav-btn ${activeTab === 'board' ? 'active' : ''}`}
            onClick={() => setActiveTab('board')}
          >
            모둠 스티커판
          </button>
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            대시보드 / 관리
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeTab === 'board' ? (
          <StickerBoard 
            students={students} 
            selectedMonth={selectedMonth}
            onAddCompliment={addCompliment} 
          />
        ) : (
          <Dashboard 
            students={students} 
            selectedMonth={selectedMonth}
            onUpdateName={updateStudentName}
            onUpdateGroup={updateStudentGroup}
            onClearData={clearData}
            onExportData={exportData}
          />
        )}
      </main>

      <Footer 
        onOpenPolicy={() => setModalContent({ title: '개인정보 처리방침', content: PRIVACY_POLICY })}
        onOpenTerms={() => setModalContent({ title: '이용약관', content: TERMS_OF_SERVICE })}
      />

      {modalContent && (
        <PolicyModal 
          title={modalContent.title} 
          content={modalContent.content} 
          onClose={() => setModalContent(null)} 
        />
      )}
    </div>
  );
}

export default App;
