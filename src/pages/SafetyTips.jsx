import { useState } from 'react';
import './SafetyTips.css';

const tips = [
  {
    id: 1,
    icon: '📱',
    title: 'Keep Your Phone Charged',
    content: 'Always ensure your phone has sufficient battery when going out. Carry a power bank if possible. A dead phone cannot send SOS alerts.',
    category: 'Preparedness',
  },
  {
    id: 2,
    icon: '📍',
    title: 'Share Live Location',
    content: 'Share your live location with trusted contacts when traveling, especially at night. Use Google Maps or WhatsApp location sharing.',
    category: 'Technology',
  },
  {
    id: 3,
    icon: '🚕',
    title: 'Verify Ride Details',
    content: 'Before getting into a cab, verify the driver\'s name, photo, license plate, and car model. Share ride details with a friend.',
    category: 'Travel',
  },
  {
    id: 4,
    icon: '🔑',
    title: 'Keys as Defense',
    content: 'Hold your keys between your fingers while walking alone. They can serve as an improvised self-defense tool if needed.',
    category: 'Self-Defense',
  },
  {
    id: 5,
    icon: '👀',
    title: 'Stay Aware',
    content: 'Avoid using headphones or being distracted by your phone while walking alone. Stay alert to your surroundings at all times.',
    category: 'Awareness',
  },
  {
    id: 6,
    icon: '🏃‍♀️',
    title: 'Trust Your Instincts',
    content: 'If something feels wrong, it probably is. Don\'t hesitate to change your route, enter a shop, or call for help. Your safety comes first.',
    category: 'Awareness',
  },
  {
    id: 7,
    icon: '🚶‍♀️',
    title: 'Walk Confidently',
    content: 'Walk with purpose and confidence. Make eye contact. Attackers tend to target people who appear vulnerable or distracted.',
    category: 'Self-Defense',
  },
  {
    id: 8,
    icon: '🏠',
    title: 'Safe Zones',
    content: 'Identify safe zones along your regular routes — police stations, hospitals, shops, ATMs with guards. Know where to go in an emergency.',
    category: 'Preparedness',
  },
];

const helplines = [
  { name: 'Women Helpline', number: '1091', icon: '📞' },
  { name: 'Police', number: '100', icon: '🚔' },
  { name: 'Emergency', number: '112', icon: '🆘' },
  { name: 'Women Commission', number: '7827-170-170', icon: '⚖️' },
  { name: 'Ambulance', number: '102', icon: '🚑' },
  { name: 'Cyber Crime', number: '1930', icon: '💻' },
];

export default function SafetyTips() {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="page tips-page" id="tips-page">
      <div className="fade-in">
        <h1 className="page-title">Safety Tips</h1>
        <p className="page-subtitle">Knowledge is your first line of defense</p>
      </div>

      {/* Helpline strip */}
      <div className="helpline-section fade-in fade-in-delay-1">
        <h3 className="section-label">Emergency Helplines</h3>
        <div className="helpline-scroll">
          {helplines.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className="helpline-card glass-card"
              id={`helpline-${h.number}`}
            >
              <span className="helpline-icon">{h.icon}</span>
              <span className="helpline-name">{h.name}</span>
              <span className="helpline-number">{h.number}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="tips-section fade-in fade-in-delay-2">
        <h3 className="section-label">Safety Guidelines</h3>
        <div className="tips-list">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`tip-card glass-card ${expandedId === tip.id ? 'tip-expanded' : ''}`}
              onClick={() => toggle(tip.id)}
              id={`tip-${tip.id}`}
            >
              <div className="tip-header">
                <span className="tip-icon">{tip.icon}</span>
                <div className="tip-header-text">
                  <h4 className="tip-title">{tip.title}</h4>
                  <span className="tip-category">{tip.category}</span>
                </div>
                <span className={`tip-chevron ${expandedId === tip.id ? 'chevron-open' : ''}`}>
                  ▾
                </span>
              </div>
              {expandedId === tip.id && (
                <div className="tip-content">
                  <p>{tip.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
