import { useState } from 'react';
import './SOSButton.css';

export default function SOSButton({ onActivate, isActive }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (isActive) return;
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onActivate();
  };

  return (
    <div className="sos-container" id="sos-button-container">
      {/* Outer pulse rings */}
      <div className={`sos-ring sos-ring-1 ${isActive ? 'ring-danger' : ''}`} />
      <div className={`sos-ring sos-ring-2 ${isActive ? 'ring-danger' : ''}`} />
      <div className={`sos-ring sos-ring-3 ${isActive ? 'ring-danger' : ''}`} />

      {/* Main button */}
      <button
        className={`sos-button ${pressed ? 'sos-pressed' : ''} ${isActive ? 'sos-active' : ''}`}
        onClick={handleClick}
        id="sos-main-button"
        aria-label="SOS Emergency Button"
      >
        <div className="sos-inner">
          <span className="sos-icon">{isActive ? '🆘' : '🛡️'}</span>
          <span className="sos-text">{isActive ? 'ACTIVE' : 'SOS'}</span>
          <span className="sos-subtext">
            {isActive ? 'Tap to stop' : 'Tap for emergency'}
          </span>
        </div>
      </button>
    </div>
  );
}
