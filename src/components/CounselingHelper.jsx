import React, { useState } from 'react';

export default function CounselingHelper({ students }) {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [gradeSummary, setGradeSummary] = useState('평가 결과는 중간 수준이며 최근 과제 완성도가 낮아짐');
  const [learningTraits, setLearningTraits] = useState('수업 참여는 적극적이나 개념 설명에 어려움이 있음');
  const [teacherConcern, setTeacherConcern] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const selectedStudent = students.find(s => s.id === selectedStudentId) || null;

  const handleRequestCounseling = async () => {
    if (!teacherConcern.trim()) {
      alert("상담 고민을 먼저 입력해주세요.");
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    const payload = {
      studentAlias: selectedStudent ? `학생 ${selectedStudent.number}` : '익명 학생',
      gradeSummary,
      learningTraits,
      teacherConcern
    };

    try {
      const response = await fetch('/api/gemini-counseling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "AI 상담 전략을 불러오지 못했습니다. API 키 또는 Vercel 환경 변수를 확인해주세요.");
      }
    } catch (err) {
      setError("AI 상담 전략을 불러오지 못했습니다. API 키 또는 Vercel 환경 변수를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>🤖 AI 학생 상담 전략 도우미</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>학생 선택</label>
          <select 
            value={selectedStudentId} 
            onChange={(e) => setSelectedStudentId(e.target.value)}
            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '4px' }}
          >
            <option value="">학생을 선택하세요</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.number}번 {s.name}</option>
            ))}
          </select>
        </div>

        {selectedStudent && (
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>선택된 학생 정보</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>화면 표시용: <strong>{selectedStudent.name} ({selectedStudent.number}번)</strong></p>
            <p style={{ fontSize: '0.9rem', color: 'var(--warning-color)' }}>
              * Gemini 전송용 익명화 정보: <strong>학생 {selectedStudent.number}</strong>
            </p>
            
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>학생 성적 요약 (수정 가능)</label>
              <input 
                type="text" 
                value={gradeSummary} 
                onChange={(e) => setGradeSummary(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '4px' }}
              />

              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>학생 학습 특성 요약 (수정 가능)</label>
              <input 
                type="text" 
                value={learningTraits} 
                onChange={(e) => setLearningTraits(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '4px' }}
              />
            </div>
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>교사 고민 입력</label>
          <textarea 
            value={teacherConcern}
            onChange={(e) => setTeacherConcern(e.target.value)}
            placeholder="수업 참여는 좋은데 평가 결과가 낮습니다. 어떻게 상담하면 좋을까요?"
            style={{ width: '100%', height: '100px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '4px', resize: 'vertical' }}
          />
        </div>

        {selectedStudent && (
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>전송 데이터 미리보기</h4>
            <pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0, color: '#a78bfa' }}>
{JSON.stringify({
  studentAlias: `학생 ${selectedStudent.number}`,
  gradeSummary,
  learningTraits,
  teacherConcern
}, null, 2)}
            </pre>
          </div>
        )}

        <button 
          className="btn-primary" 
          onClick={handleRequestCounseling}
          disabled={loading || !selectedStudentId}
          style={{ padding: '0.8rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
        >
          {loading ? 'AI가 상담 전략을 생성하는 중입니다...' : 'AI 상담 전략 받기'}
        </button>

        {error && (
          <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #ef4444' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--success-color)', marginTop: '1rem' }}>
            <h4 style={{ color: 'var(--success-color)', marginBottom: '1rem' }}>💡 제안된 상담 전략</h4>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {result}
            </div>
          </div>
        )}

        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>
          “AI 상담 전략은 참고용입니다. 최종 판단과 실제 상담은 교사가 학생의 상황을 종합적으로 고려하여 진행해야 합니다.”
        </p>
      </div>
    </div>
  );
}
