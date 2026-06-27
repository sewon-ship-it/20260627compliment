import React from 'react';

export default function StudentCard({ student, onClick }) {
  return (
    <div className="student-card" onClick={() => onClick(student)}>
      <div className="student-name">{student.name}</div>
      <div className="student-stickers">
        {student.totalStickers}
      </div>
    </div>
  );
}
