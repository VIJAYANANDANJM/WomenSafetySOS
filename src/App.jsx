import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import SafetyTips from './pages/SafetyTips';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/tips" element={<SafetyTips />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
}
