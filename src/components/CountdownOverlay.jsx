import { useState, useEffect } from 'react';
import './CountdownOverlay.css';

export default function CountdownOverlay({ seconds = 3, onComplete, onCancel }) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="countdown-overlay" id="countdown-overlay">
      <div className="countdown-bg-pulse" />
      <div className="countdown-content">
        <div className="countdown-label">⚠️ SOS ACTIVATING</div>
        <div className="countdown-number" key={count}>
          {count}
        </div>
        <p className="countdown-msg">
          Emergency alert will be sent in {count} second{count !== 1 ? 's' : ''}
        </p>
        <button
          className="btn btn-ghost countdown-cancel"
          onClick={onCancel}
          id="countdown-cancel-btn"
        >
          ✕ Cancel
        </button>
      </div>
    </div>
  );
}
