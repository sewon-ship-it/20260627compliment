import React from 'react';
import StudentCard from './StudentCard';

export default function GroupCard({ groupNumber, students, onStudentClick }) {
  const groupTotal = students.reduce((sum, s) => sum + s.totalStickers, 0);

  return (
    <div className="glass-panel group-card">
      <div className="group-header">
        <h3 className="group-title">{groupNumber} 모둠</h3>
        <span className="group-total">총 {groupTotal}개</span>
      </div>
      <div className="students-grid">
        {students.map(student => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onClick={onStudentClick} 
          />
        ))}
      </div>
    </div>
  );
}
