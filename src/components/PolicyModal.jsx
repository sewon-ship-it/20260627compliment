import React from 'react';

export default function PolicyModal({ title, content, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content" style={{ maxWidth: '800px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <h2 className="modal-title">{title}</h2>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '1rem', whiteSpace: 'pre-wrap', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {content}
        </div>
        <button className="btn-primary" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
