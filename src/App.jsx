import React, { useState } from 'react';
import './App.css';
import { useStickerData } from './hooks/useStickerData';
import Setup from './components/Setup';
import Dashboard from './components/Dashboard';
import StickerBoard from './components/StickerBoard';
import PoliciesModal from './components/PoliciesModal';
import StudentReflection from './components/StudentReflection';


function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'teacher' | 'student'
  const [loggedInStudentNumber, setLoggedInStudentNumber] = useState(null);
  const [activeTab, setActiveTab] = useState('board'); // 'board' or 'dashboard'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [activePolicyTab, setActivePolicyTab] = useState(null);

  const {
    students,
    addCompliment,
    updateStudentName,
    updateStudentGroup,
    bulkUpdateStudents,
    clearData,
    exportData
  } = useStickerData();

  if (!isAuthorized) {
    return (
      <Setup 
        onComplete={(role, studentNum) => {
          setUserRole(role);
          setLoggedInStudentNumber(studentNum);
          setIsAuthorized(true);
        }} 
      />
    );
  }

  if (userRole === 'student') {
    return (
      <div className="app-container">
        <header className="header no-print">
          <div className="header-title">우리 반 칭찬 스티커판 ✨ (학생 모드)</div>
        </header>
        <main className="main-content">
          <StudentReflection studentNumber={loggedInStudentNumber} />
        </main>
      </div>
    );
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
            onBulkUpdate={bulkUpdateStudents}
            onClearData={clearData}
            onExportData={exportData}
          />
        )}
      </main>


      {/* Footer */}
      <footer style={{ padding: '1.5rem', marginTop: 'auto', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setActivePolicyTab('terms')}>이용약관</span>
          <span style={{ margin: '0 0.8rem' }}>|</span>
          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setActivePolicyTab('privacy')}>개인정보 처리방침</span>
        </div>
        <div style={{ textAlign: 'center', lineHeight: '1.5' }}>
          <span>정보관리책임자: 중앙대학교사범대학부속초등학교 교사 박세원</span><br/>
          <span>© 2026 우리 반 칭찬 스티커판. All rights reserved.</span>
        </div>
      </footer>

      {activePolicyTab && <PoliciesModal initialTab={activePolicyTab} onClose={() => setActivePolicyTab(null)} />}
    </div>
  );
}

export default App;
