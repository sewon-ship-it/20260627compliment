import React, { useState } from 'react';
import GroupCard from './GroupCard';

export default function StickerBoard({ students, onAddCompliment }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reason, setReason] = useState('');

  // 그룹별로 학생 나누기
  const groups = Array.from({ length: 6 }, (_, i) => i + 1).map(groupNum => {
    return students.filter(s => s.groupNumber === groupNum);
  });

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setReason('');
  };

  const handleSubmitCompliment = (e) => {
    e.preventDefault();
    if (selectedStudent && reason.trim()) {
      onAddCompliment(selectedStudent.id, reason);
      setSelectedStudent(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button className="btn-primary" style={{ width: 'auto' }} onClick={handlePrint}>
          🖨️ 인쇄하기 / PDF 저장
        </button>
      </div>

      <div className="sticker-board-grid">
        {groups.map((groupStudents, index) => (
          <GroupCard 
            key={`group_${index + 1}`} 
            groupNumber={index + 1} 
            students={groupStudents} 
            onStudentClick={handleStudentClick}
          />
        ))}
      </div>

      {selectedStudent && (
        <div className="modal-overlay no-print">
          <div className="glass-panel modal-content">
            <h2 className="modal-title">{selectedStudent.name} 칭찬하기</h2>
            <form onSubmit={handleSubmitCompliment}>
              <div className="form-group">
                <label className="form-label">어떤 점을 칭찬하시겠어요?</label>
                <input 
                  type="text" 
                  className="form-input" 
                  autoFocus
                  placeholder="예: 수업 준비를 잘했어요"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn-primary">칭찬 스티커 1개 추가</button>
                <button type="button" className="btn-danger" style={{ width: '100%' }} onClick={() => setSelectedStudent(null)}>취소</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
