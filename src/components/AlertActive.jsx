import './AlertActive.css';

export default function AlertActive({ location, onDeactivate, contacts }) {
  const mapsLink = location
    ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    : null;

  const smsBody = location
    ? encodeURIComponent(
        `🚨 EMERGENCY SOS! I need help! My location: https://www.google.com/maps?q=${location.latitude},${location.longitude}`
      )
    : '';

  const phoneNumbers = contacts.map((c) => c.phone).join(',');

  return (
    <div className="alert-active fade-in" id="alert-active-panel">
      <div className="alert-header">
        <div className="alert-beacon" />
        <h2 className="alert-title">🚨 Alert Active</h2>
        <p className="alert-subtitle">Emergency contacts notified</p>
      </div>

      {location && (
        <div className="alert-location glass-card">
          <div className="alert-loc-header">
            <span className="alert-loc-icon">📍</span>
            <span className="alert-loc-title">Your Location</span>
          </div>
          <div className="alert-coords">
            <div className="coord-row">
              <span className="coord-label">Lat</span>
              <span className="coord-value">{location.latitude.toFixed(6)}</span>
            </div>
            <div className="coord-row">
              <span className="coord-label">Lng</span>
              <span className="coord-value">{location.longitude.toFixed(6)}</span>
            </div>
          </div>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary alert-map-btn"
            id="view-map-btn"
          >
            🗺️ View on Google Maps
          </a>
        </div>
      )}

      <div className="alert-actions">
        {phoneNumbers && (
          <a
            href={`sms:${phoneNumbers}?body=${smsBody}`}
            className="btn btn-danger alert-action-btn"
            id="send-sms-btn"
          >
            📱 Send SMS to Contacts
          </a>
        )}

        <a
          href="tel:112"
          className="btn btn-danger alert-action-btn"
          id="call-emergency-btn"
        >
          📞 Call Emergency (112)
        </a>

        {mapsLink && (
          <button
            className="btn btn-ghost alert-action-btn"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'SOS - My Location',
                  text: `🚨 I need help! My location: `,
                  url: mapsLink,
                });
              } else {
                navigator.clipboard.writeText(mapsLink);
              }
            }}
            id="share-location-btn"
          >
            📤 Share Location Link
          </button>
        )}
      </div>

      <button
        className="btn btn-safe"
        onClick={onDeactivate}
        id="im-safe-btn"
      >
        ✅ I'm Safe — Deactivate
      </button>
    </div>
  );
}
