import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import VideoPlayer from './pages/VideoPlayer';
import Pricing from './pages/Pricing';
import { TermsOfService, PrivacyPolicy, RiskDisclosure, RefundPolicy } from './pages/Legal';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ChatBot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <VideoPlayer />
              </ProtectedRoute>
            }
          />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/risk" element={<RiskDisclosure />} />
          <Route path="/refund" element={<RefundPolicy />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Replace this URL with your Google Web App URL after deployment
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwWCHj7mQeax4dZdnVFdEetubN0Add0-gF2naIDeXIy_EU2THV1_Uhlsl9UUMb32BaRfw/exec';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setStatus('success');
      setFormData({ name: '', email: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer className="page-footer">
      <div className="newsletter-section">
        <div className="max-w-7xl mx-auto px-8 lg:px-24 py-20">
          <div className="newsletter-card glass">
            <div className="text-left mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Market mastery delivered to your inbox</h2>
              <p className="text-muted">Join <span className="text-primary font-semibold">100+ traders</span> receiving daily systematic insights.</p>
            </div>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="clean-input"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={status === 'loading'}
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="clean-input"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type="submit"
                className={`btn-premium btn-primary subscribe-btn ${status === 'success' ? 'success' : ''}`}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Subscribed!' : status === 'error' ? 'Try Again' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer glass">
        <div className="max-w-7xl mx-auto px-8 lg:px-24 py-16">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-col brand-col">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">PERFECT FX ACADEMY</span>
              </h3>
              <p className="text-muted mb-6 text-xs">Empowering traders with professional infrastructure, systematic strategies, and a funded community.</p>
              <div className="social-links">
                <a href="#" className="social-icon"><Instagram size={20} /></a>
                <a href="#" className="social-icon"><Twitter size={20} /></a>
                <a href="#" className="social-icon"><Youtube size={20} /></a>
                <a href="#" className="social-icon"><Facebook size={20} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-nav">
                <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
                <li><Link to="/dashboard" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Courses</Link></li>
                <li><a href="/#about">About Us</a></li>
                <li><Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Student Login</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-col">
              <h4>Legal</h4>
              <ul className="footer-nav">
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/risk">Risk Disclosure</Link></li>
                <li><Link to="/refund">Refund Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="contact-list">
                <li><Mail size={16} className="text-primary" /> support@perfectfx.com</li>
                <li><MapPin size={16} className="text-primary" /> Manipur, India</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="disclaimer">
              <strong>Risk Warning:</strong> Trading foreign exchange on margin carries a high level of risk, and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange you should carefully consider your investment objectives, level of experience, and risk appetite.
            </p>
            <div className="copyright">
              <p className="text-muted text-sm">© 2026 Perfect FX Academy. All rights reserved.</p>
            </div>
          </div>
        </div>

      </div>
      <style jsx="true">{`
      .page-footer {
        margin-top: 0;
      }
      .newsletter-section {
        background: transparent;
        padding: 60px 0 160px;
        display: flex;
        justify-content: center;
      }
      .newsletter-card {
        padding: 0;
        background: transparent;
        border: none;
        box-shadow: none;
        width: 100%;
        margin: 0;
        padding-left: 60px;
        padding-right: 60px;
      }
      .newsletter-form {
        display: flex;
        margin-top: 20px;
        gap: 50px;
        align-items: center;
        justify-content: flex-start;
        max-width: 800px;
      }
      .input-wrapper {
        flex: 1;
      }
      .clean-input {
        width: 100%;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 16px 24px;
        border-radius: 12px;
        color: white;
        font-size: 0.95rem;
        transition: all 0.3s ease;
      }
      .clean-input:focus {
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--primary);
        outline: none;
      }
      .subscribe-btn {
        padding: 16px 40px;
        border-radius: 12px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-size: 0.9rem;
      }
      
      .footer {
        border-radius: 0;
        border: none;
        border-top: 1px solid rgba(255,255,255,0.05);
        background: #05070a;
        margin-top: 0;
        padding-top: 60px;
        color: #94a3b8;
      }
      .footer-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
        gap: 80px;
        margin-bottom: 80px;
        align-items: start;
        padding-left: 60px;
        padding-right: 60px;
      }
      .footer-col h4 {
        color: white;
        font-size: 0.95rem;
        font-weight: 600;
        margin-bottom: 20px;
        letter-spacing: 0.05em;
        white-space: nowrap;
      }
      .footer-nav {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .footer-nav a {
        color: var(--text-muted);
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: 0.85rem;
        white-space: nowrap;
      }
      .footer-nav a:hover, .contact-list li:hover {
        color: var(--primary);
      }
      .contact-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .contact-list li {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.85rem;
      }
      .social-links {
        display: flex;
        gap: 16px;
      }
      .social-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.3s ease;
      }
      .social-icon:hover {
        background: var(--primary);
        color: black;
        transform: translateY(-3px);
      }
      .footer-bottom {
        padding-top: 40px;
        border-top: 1px solid rgba(255,255,255,0.05);
        padding-left: 60px;
        padding-right: 60px;
      }
      .disclaimer {
        font-size: 0.75rem;
        line-height: 1.6;
        color: #52525b;
        margin-bottom: 24px;
        text-align: justify;
      }
      .copyright {
        text-align: center;
        color: #52525b;
        font-size: 0.85rem;
      }
      .mb-4 { margin-bottom: 1rem; }
      .mb-6 { margin-bottom: 1.5rem; }
      
      @media (max-width: 968px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .brand-col {
          grid-column: span 2;
          padding-left: 40px;
        }
      }
      @media (max-width: 640px) {
        .footer-grid {
          grid-template-columns: 1fr;
          text-align: center;
        }
        .brand-col {
          grid-column: span 1;
        }
        .social-links {
            justify-content: center;
        }
        .contact-list li {
            justify-content: center;
        }
      }
      
      @media (max-width: 768px) {
        .newsletter-card {
            padding: 40px 24px;
        }
        .newsletter-form {
          flex-direction: column;
          width: 100%;
        }
        .input-wrapper {
            width: 100%;
        }
        .subscribe-btn {
            width: 100%;
        }
      }
    `}</style>
    </footer>
  );
};

export default App;
