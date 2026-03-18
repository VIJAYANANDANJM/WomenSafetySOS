const CONTACTS_KEY = 'safeher_contacts';
const SETTINGS_KEY = 'safeher_settings';

export const defaultSettings = {
  sirenEnabled: true,
  vibrationEnabled: true,
  autoShareLocation: true,
  sosMessage: "🚨 EMERGENCY SOS! I need immediate help! Here's my live location: ",
  countdownSeconds: 3,
};

export function getContacts() {
  try {
    const data = localStorage.getItem(CONTACTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveContacts(contacts) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function addContact(contact) {
  const contacts = getContacts();
  contacts.push({ ...contact, id: Date.now().toString() });
  saveContacts(contacts);
  return contacts;
}

export function removeContact(id) {
  const contacts = getContacts().filter(c => c.id !== id);
  saveContacts(contacts);
  return contacts;
}

export function getSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
