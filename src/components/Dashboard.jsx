import React, { useState } from 'react';

export default function Dashboard({ students, selectedMonth, onUpdateName, onUpdateGroup, onBulkUpdate, onClearData, onExportData }) {
  const [editingStudent, setEditingStudent] = useState(null);
  const [tempName, setTempName] = useState('');

  const totalStickers = students.reduce((sum, s) => sum + s.totalStickers, 0);
  
  // 최근 칭찬 내역 10개
  const recentHistory = students.flatMap(s => 
    s.complimentHistory.map(h => ({ ...h, studentName: s.name }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setTempName(student.name);
  };

  const handleSaveName = (id) => {
    onUpdateName(id, tempName);
    setEditingStudent(null);
  };

  const handleGroupChange = (studentId, newGroupNum) => {
    onUpdateGroup(studentId, selectedMonth, newGroupNum);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter(line => line.trim().length > 0);
      const parsedData = [];
      lines.forEach((line, index) => {
        const parts = line.split(',');
        // 첫 줄이 헤더인지 확인 (첫 글자가 숫자가 아니면 헤더로 간주)
        if (index === 0 && isNaN(parseInt(parts[0].trim(), 10))) return;
        
        if (parts.length >= 3) {
          parsedData.push({
            number: parseInt(parts[0].trim(), 10),
            name: parts[1].trim(),
            group: parseInt(parts[2].trim(), 10)
          });
        }
      });
      
      if (parsedData.length > 0) {
        onBulkUpdate(parsedData, selectedMonth);
        alert(`${selectedMonth}월에 ${parsedData.length}명의 데이터가 반영되었습니다.`);
      } else {
        alert("올바른 형식의 CSV가 아닙니다. (번호, 이름, 모둠 순서)");
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset input
  };

  const handleClear = () => {
    if (window.confirm("정말로 모든 데이터를 초기화하시겠습니까? 복구할 수 없습니다!")) {
      if (window.prompt("초기화를 진행하려면 '초기화' 라고 입력해주세요.") === '초기화') {
        onClearData();
        alert("데이터가 초기화되었습니다.");
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>학급 총 칭찬 스티커</h2>
        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
          {totalStickers}개
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>명렬표 및 이름 수정</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.5rem' }}>번호</th>
                  <th style={{ padding: '0.5rem' }}>이름</th>
                  <th style={{ padding: '0.5rem' }}>모둠</th>
                  <th style={{ padding: '0.5rem' }}>스티커</th>
                  <th style={{ padding: '0.5rem' }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.5rem' }}>{s.number}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {editingStudent === s.id ? (
                        <input 
                          type="text" 
                          value={tempName} 
                          onChange={(e) => setTempName(e.target.value)}
                          style={{ background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--accent-color)', padding: '0.2rem', borderRadius: '4px' }}
                        />
                      ) : (
                        s.name
                      )}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <select 
                        value={s.monthlyGroups?.[selectedMonth] || 1} 
                        onChange={(e) => handleGroupChange(s.id, e.target.value)}
                        style={{ background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--border-color)', padding: '0.2rem', borderRadius: '4px' }}
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num}모둠</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '0.5rem' }}>{s.totalStickers}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {editingStudent === s.id ? (
                        <button onClick={() => handleSaveName(s.id)} style={{ color: 'var(--success-color)', background: 'none' }}>저장</button>
                      ) : (
                        <button onClick={() => handleEditClick(s)} style={{ color: 'var(--accent-color)', background: 'none' }}>수정</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>최근 칭찬 기록 (최대 10개)</h3>
          {recentHistory.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>아직 칭찬 기록이 없습니다.</p>
          ) : (
            <div className="history-list">
              {recentHistory.map((item, idx) => (
                <div key={idx} className="history-item">
                  <div>
                    <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{item.studentName}</span>
                    <span>{item.reason}</span>
                  </div>
                  <div className="history-date">{item.date}</div>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>데이터 일괄 추가 / 관리</h4>
            
            <label className="btn-primary" style={{ textAlign: 'center', cursor: 'pointer', background: 'var(--surface-hover)' }}>
              📄 CSV(엑셀) 파일로 모둠 명단 업로드
              <input 
                type="file" 
                accept=".csv" 
                style={{ display: 'none' }} 
                onChange={handleFileUpload} 
              />
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              * 현재 선택된 <strong>{selectedMonth}월</strong>의 모둠으로 배정됩니다.<br/>
              * CSV 형식: <code>번호, 이름, 모둠</code> (예: <code>1, 홍길동, 3</code>)
            </p>

            <button className="btn-primary" onClick={onExportData}>데이터 백업 (JSON 다운로드)</button>
            <button className="btn-danger" onClick={handleClear}>모든 데이터 초기화 (영구 삭제)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
