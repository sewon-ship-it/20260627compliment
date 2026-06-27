import React from 'react';

export default function Footer({ onOpenPolicy, onOpenTerms }) {
  return (
    <footer className="footer no-print">
      <div className="footer-links">
        <button onClick={onOpenPolicy}>개인정보 처리방침</button>
        <span>|</span>
        <button onClick={onOpenTerms}>이용약관</button>
        <span>|</span>
        <span>문의/담당자: 학급 담임 교사</span>
      </div>
      <div>
        <span>OO학교 | 시행일: 2026.06.27 | 변경일: 2026.06.27</span>
      </div>
    </footer>
  );
}
