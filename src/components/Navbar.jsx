import { NavLink } from 'react-router-dom';
import './Navbar.css';

const tabs = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/contacts', icon: '👥', label: 'Contacts' },
  { path: '/tips', icon: '🛡️', label: 'Safety' },
  { path: '/settings', icon: '⚙️', label: 'Settings' },
];

export default function Navbar() {
  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-blur" />
      <div className="navbar-content">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => `nav-tab ${isActive ? 'nav-tab-active' : ''}`}
            id={`nav-${tab.label.toLowerCase()}`}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
