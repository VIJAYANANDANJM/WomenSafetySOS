import { useState, useEffect } from 'react';
import { getSettings, saveSettings, defaultSettings } from '../utils/storage';
import './Settings.css';

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveSettings(updated);
    showToast('✅ Setting saved');
  };

  return (
    <div className="page settings-page" id="settings-page">
      <div className="fade-in">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Customize your safety preferences</p>
      </div>

      {/* SOS Settings */}
      <div className="settings-section fade-in fade-in-delay-1">
        <h3 className="section-label">SOS Configuration</h3>

        <div className="setting-item glass-card">
          <div className="setting-info">
            <span className="setting-icon">🔊</span>
            <div>
              <h4 className="setting-title">Siren on SOS</h4>
              <p className="setting-desc">Play loud alarm when SOS is activated</p>
            </div>
          </div>
          <label className="toggle" id="siren-toggle">
            <input
              type="checkbox"
              checked={settings.sirenEnabled}
              onChange={(e) => updateSetting('sirenEnabled', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="setting-item glass-card">
          <div className="setting-info">
            <span className="setting-icon">📳</span>
            <div>
              <h4 className="setting-title">Vibration</h4>
              <p className="setting-desc">Vibrate phone during emergency</p>
            </div>
          </div>
          <label className="toggle" id="vibration-toggle">
            <input
              type="checkbox"
              checked={settings.vibrationEnabled}
              onChange={(e) => updateSetting('vibrationEnabled', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="setting-item glass-card">
          <div className="setting-info">
            <span className="setting-icon">📍</span>
            <div>
              <h4 className="setting-title">Auto-share Location</h4>
              <p className="setting-desc">Automatically share GPS on SOS</p>
            </div>
          </div>
          <label className="toggle" id="location-toggle">
            <input
              type="checkbox"
              checked={settings.autoShareLocation}
              onChange={(e) => updateSetting('autoShareLocation', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
        </div>

        <div className="setting-item glass-card setting-column">
          <div className="setting-info">
            <span className="setting-icon">⏱️</span>
            <div>
              <h4 className="setting-title">Countdown Timer</h4>
              <p className="setting-desc">Seconds before SOS activates</p>
            </div>
          </div>
          <div className="countdown-selector">
            {[1, 3, 5].map((sec) => (
              <button
                key={sec}
                className={`countdown-opt ${settings.countdownSeconds === sec ? 'opt-active' : ''}`}
                onClick={() => updateSetting('countdownSeconds', sec)}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="settings-section fade-in fade-in-delay-2">
        <h3 className="section-label">SOS Message</h3>
        <div className="setting-item glass-card setting-column">
          <div className="setting-info">
            <span className="setting-icon">💬</span>
            <div>
              <h4 className="setting-title">Custom SOS Message</h4>
              <p className="setting-desc">Message sent to contacts (location link auto-appended)</p>
            </div>
          </div>
          <textarea
            className="input sos-message-input"
            value={settings.sosMessage}
            onChange={(e) => updateSetting('sosMessage', e.target.value)}
            rows={3}
            id="sos-message-textarea"
          />
        </div>
      </div>

      {/* About */}
      <div className="settings-section fade-in fade-in-delay-3">
        <h3 className="section-label">About</h3>
        <div className="about-card glass-card">
          <div className="about-header">
            <span className="about-icon">🛡️</span>
            <div>
              <h4 className="about-name">SafeHer</h4>
              <p className="about-version">Version 1.0.0</p>
            </div>
          </div>
          <p className="about-desc">
            Your personal safety companion. One-tap SOS alerts, live GPS sharing,
            and emergency resources — all designed to keep you safe.
          </p>
          <div className="about-features">
            <span className="feature-tag">🔴 One-Tap SOS</span>
            <span className="feature-tag">📍 GPS Sharing</span>
            <span className="feature-tag">🔊 Siren Alert</span>
            <span className="feature-tag">📞 Fake Call</span>
            <span className="feature-tag">📱 SMS Alerts</span>
            <span className="feature-tag">🌐 Offline Ready</span>
          </div>
        </div>
      </div>

      {toast && <div className="toast" id="settings-toast">{toast}</div>}
    </div>
  );
}
