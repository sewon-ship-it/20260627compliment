import React, { useState } from 'react';
import './App.css';
import { useStickerData } from './hooks/useStickerData';
import Setup from './components/Setup';
import Dashboard from './components/Dashboard';
import StickerBoard from './components/StickerBoard';
import PoliciesModal from './components/PoliciesModal';


function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('board'); // 'board' or 'dashboard'
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [showPolicies, setShowPolicies] = useState(false);

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
            onBulkUpdate={bulkUpdateStudents}
            onClearData={clearData}
            onExportData={exportData}
          />
        )}
      </main>


      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '1rem', marginTop: 'auto', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setShowPolicies(true)}>개인정보 처리방침 및 이용약관</span>
        <span style={{ margin: '0 0.5rem' }}>|</span>
        <span>© 2026 우리 반 칭찬 스티커판</span>
      </footer>

      {showPolicies && <PoliciesModal onClose={() => setShowPolicies(false)} />}
    </div>
  );
}

export default App;
