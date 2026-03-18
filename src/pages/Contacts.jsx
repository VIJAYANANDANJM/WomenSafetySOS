import { useState, useEffect } from 'react';
import { getContacts, addContact, removeContact } from '../utils/storage';
import './Contacts.css';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', relation: 'Family' });
  const [toast, setToast] = useState('');

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('⚠️ Please fill in all fields');
      return;
    }
    const updated = addContact(formData);
    setContacts(updated);
    setShowModal(false);
    setFormData({ name: '', phone: '', relation: 'Family' });
    showToast('✅ Contact added successfully');
  };

  const handleRemove = (id) => {
    const updated = removeContact(id);
    setContacts(updated);
    showToast('🗑️ Contact removed');
  };

  const relationEmojis = {
    Family: '👨‍👩‍👧',
    Friend: '🤝',
    Partner: '❤️',
    Neighbor: '🏠',
    Other: '👤',
  };

  return (
    <div className="page contacts-page" id="contacts-page">
      <div className="fade-in">
        <h1 className="page-title">Emergency Contacts</h1>
        <p className="page-subtitle">People who will be alerted during SOS</p>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state fade-in fade-in-delay-1">
          <div className="empty-icon">👥</div>
          <h3 className="empty-title">No contacts yet</h3>
          <p className="empty-desc">
            Add trusted people who should be notified when you trigger an SOS alert
          </p>
        </div>
      ) : (
        <div className="contacts-list">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className={`contact-card glass-card fade-in fade-in-delay-${Math.min(index + 1, 4)}`}
              id={`contact-${contact.id}`}
            >
              <div className="contact-avatar">
                {relationEmojis[contact.relation] || '👤'}
              </div>
              <div className="contact-info">
                <h4 className="contact-name">{contact.name}</h4>
                <p className="contact-phone">{contact.phone}</p>
                <span className="contact-badge">{contact.relation}</span>
              </div>
              <div className="contact-actions">
                <a href={`tel:${contact.phone}`} className="contact-action-btn call-btn" title="Call">
                  📞
                </a>
                <button
                  className="contact-action-btn remove-btn"
                  onClick={() => handleRemove(contact.id)}
                  title="Remove"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button
        className="fab"
        onClick={() => setShowModal(true)}
        id="add-contact-fab"
        aria-label="Add Contact"
      >
        <span className="fab-icon">+</span>
      </button>

      {/* Add Contact Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add Emergency Contact</h3>
            <form onSubmit={handleAdd} className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Contact name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  id="contact-name-input"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  id="contact-phone-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Relationship</label>
                <div className="relation-chips">
                  {Object.keys(relationEmojis).map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      className={`relation-chip ${formData.relation === rel ? 'chip-active' : ''}`}
                      onClick={() => setFormData({ ...formData, relation: rel })}
                    >
                      {relationEmojis[rel]} {rel}
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" id="save-contact-btn">
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="toast" id="contacts-toast">{toast}</div>}
    </div>
  );
}
