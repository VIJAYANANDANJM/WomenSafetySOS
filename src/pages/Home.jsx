import { useState, useCallback } from 'react';
import SOSButton from '../components/SOSButton';
import CountdownOverlay from '../components/CountdownOverlay';
import AlertActive from '../components/AlertActive';
import { getCurrentLocation } from '../utils/location';
import { startSiren, stopSiren } from '../utils/siren';
import { triggerVibration, stopVibration } from '../utils/location';
import { getContacts, getSettings } from '../utils/storage';
import './Home.css';

export default function Home() {
  const [showCountdown, setShowCountdown] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [toast, setToast] = useState('');

  const settings = getSettings();
  const contacts = getContacts();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSOSPress = () => {
    if (alertActive) {
      deactivateAlert();
      return;
    }
    setShowCountdown(true);
  };

  const activateAlert = useCallback(async () => {
    setShowCountdown(false);
    setAlertActive(true);

    // Start siren
    if (settings.sirenEnabled) {
      startSiren();
    }

    // Vibrate
    if (settings.vibrationEnabled) {
      triggerVibration([500, 200, 500, 200, 500, 200, 1000]);
    }

    // Get location
    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
      showToast('📍 Location acquired — Alert active!');
    } catch (err) {
      showToast('⚠️ Could not get location. Alert still active.');
      console.error('Location error:', err);
    }
  }, [settings]);

  const deactivateAlert = () => {
    setAlertActive(false);
    setLocation(null);
    stopSiren();
    stopVibration();
    showToast('✅ Alert deactivated — Stay safe!');
  };

  const handleFakeCall = () => {
    showToast('📞 Fake call started — phone ringing...');
    if (settings.vibrationEnabled) {
      triggerVibration([1000, 500, 1000, 500, 1000]);
    }
  };

  const handleQuickSiren = () => {
    startSiren();
    showToast('🔊 Siren activated — tap again to stop');
    setTimeout(() => {
      stopSiren();
    }, 5000);
  };

  const handleShareLocation = async () => {
    try {
      const loc = await getCurrentLocation();
      const mapsLink = `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`;
      if (navigator.share) {
        await navigator.share({
          title: 'My Current Location',
          text: '📍 Here is my current location:',
          url: mapsLink,
        });
      } else {
        await navigator.clipboard.writeText(mapsLink);
        showToast('📋 Location link copied to clipboard!');
      }
    } catch (err) {
      showToast('⚠️ Could not share location');
    }
  };

  return (
    <div className="page home-page" id="home-page">
      {/* Header */}
      <div className="home-header fade-in">
        <div className="home-brand">
          <span className="brand-icon">🛡️</span>
          <div>
            <h1 className="brand-name">SafeHer</h1>
            <p className="brand-tagline">Your safety, one tap away</p>
          </div>
        </div>
        <div className={`status-badge ${alertActive ? 'status-danger' : 'status-safe'}`}>
          <span className="status-dot" />
          {alertActive ? 'ALERT ACTIVE' : 'SAFE'}
        </div>
      </div>

      {/* SOS Section */}
      {!alertActive ? (
        <>
          <div className="sos-section fade-in fade-in-delay-1">
            <SOSButton onActivate={handleSOSPress} isActive={alertActive} />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions fade-in fade-in-delay-2">
            <h3 className="quick-title">Quick Actions</h3>
            <div className="quick-grid">
              <button className="quick-card glass-card" onClick={handleFakeCall} id="fake-call-btn">
                <span className="quick-icon">📞</span>
                <span className="quick-label">Fake Call</span>
              </button>
              <button className="quick-card glass-card" onClick={handleQuickSiren} id="quick-siren-btn">
                <span className="quick-icon">🔊</span>
                <span className="quick-label">Siren</span>
              </button>
              <button className="quick-card glass-card" onClick={handleShareLocation} id="share-loc-btn">
                <span className="quick-icon">📍</span>
                <span className="quick-label">Share Location</span>
              </button>
              <a href="tel:112" className="quick-card glass-card" id="call-112-btn">
                <span className="quick-icon">🆘</span>
                <span className="quick-label">Call 112</span>
              </a>
            </div>
          </div>

          {/* Info Footer */}
          <div className="home-info fade-in fade-in-delay-3">
            <p>
              {contacts.length > 0
                ? `${contacts.length} emergency contact${contacts.length !== 1 ? 's' : ''} configured`
                : 'No emergency contacts added yet'}
            </p>
          </div>
        </>
      ) : (
        <AlertActive
          location={location}
          contacts={contacts}
          onDeactivate={deactivateAlert}
        />
      )}

      {/* Countdown Overlay */}
      {showCountdown && (
        <CountdownOverlay
          seconds={settings.countdownSeconds}
          onComplete={activateAlert}
          onCancel={() => setShowCountdown(false)}
        />
      )}

      {/* Toast */}
      {toast && <div className="toast" id="toast-msg">{toast}</div>}
    </div>
  );
}
