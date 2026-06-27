import React, { useState } from 'react';

export default function StudentReflection({ studentNumber }) {
  const [concern, setConcern] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!concern.trim()) {
      alert("고민을 먼저 입력해주세요.");
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/gemini-reflection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentNumber,
          studentConcern: concern
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "상담 내용을 불러오지 못했습니다.");
      }
    } catch (err) {
      setError("서버 통신에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '1rem', color: '#10b981' }}>🎓 학생 {studentNumber} - AI 학교생활 자기 성찰 도우미</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        AI와 함께 나의 학교생활을 돌아보고 성장하는 시간을 가져보세요.
      </p>
      
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'stretch' }}>
        <div style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>요즘 학교생활에서 어떤 고민이 있나요?</label>
          <textarea 
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="예: 친구들과 친해지고 싶은데 어떻게 다가가야 할지 모르겠어요. / 요즘 수업 시간에 자꾸 졸려요."
            style={{ width: '100%', height: '120px', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', resize: 'vertical' }}
          />
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading || !concern.trim()}
          className="btn-primary"
          style={{ background: '#10b981', padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {loading ? 'AI 선생님이 조언을 작성하고 있어요...' : 'AI 선생님의 따뜻한 조언 듣기'}
        </button>

        {error && (
          <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid #ef4444', marginTop: '1rem' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--success-color)', marginTop: '1rem', textAlign: 'left' }}>
            <h4 style={{ color: 'var(--success-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>✨ AI 선생님의 한 마디</h4>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem' }}>
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
