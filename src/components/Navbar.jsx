import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { Menu, X, LogOut, User, Video, Home, Info, Zap, DollarSign, Award } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isVideoPage = location.pathname.includes('/course/');

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle transparent background logic
      setIsScrolled(currentScrollY > 50);

      // Always show at very top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Scrolling DOWN -> Hide
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      // Scrolling UP -> Show
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
    closeMobileMenu();
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b 
          ${isScrolled ? 'py-2 border-white/20' : 'py-3 border-white/10'} 
          ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
        style={{
          background: 'rgba(5, 7, 10, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center relative gap-4">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3 no-underline text-gradient-logo shrink-0 z-10">
            <span className="tracking-tight">PERFECT</span>
            <span className="tracking-tight">FX</span>
            <span className="tracking-widest">ACADEMY</span>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <div className="desktop-nav-links">
            <Link to="/" onClick={scrollToTop} className="nav-item">Home</Link>
            <a href="/#about" className="nav-item">About</a>
            <a href="/#features" className="nav-item">Features</a>
            <a href="/#testimonials" className="nav-item">Testimonials</a>
            <Link to="/pricing" onClick={scrollToTop} className="nav-item">Pricing</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 md:gap-4 z-10">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="nav-item flex items-center gap-2 text-sm">
                  <Video className="w-4 h-4" /> Courses
                </Link>
                <button onClick={handleLogout} className="btn-premium btn-outline py-2 px-4 text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-item text-sm">Login</Link>
                <Link to="/register" className="btn-premium btn-primary btn-shine py-2.5 px-7 text-sm font-bold whitespace-nowrap tracking-wide">
                  Enroll Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hamburger-btn z-10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <div className="text-xl font-bold text-gradient-logo">
            <span className="tracking-tight">PERFECT FX</span>
            <span className="tracking-widest ml-2">ACADEMY</span>
          </div>
          <button onClick={closeMobileMenu} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav">
          <Link to="/" onClick={(e) => { closeMobileMenu(); scrollToTop(); }} className="mobile-nav-item">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <a href="/#about" onClick={closeMobileMenu} className="mobile-nav-item">
            <Info size={20} />
            <span>About</span>
          </a>
          <a href="/#features" onClick={closeMobileMenu} className="mobile-nav-item">
            <Zap size={20} />
            <span>Features</span>
          </a>
          <a href="/#testimonials" onClick={closeMobileMenu} className="mobile-nav-item">
            <Award size={20} />
            <span>Testimonials</span>
          </a>
          <Link to="/pricing" onClick={closeMobileMenu} className="mobile-nav-item">
            <DollarSign size={20} />
            <span>Pricing</span>
          </Link>

          <div className="mobile-divider"></div>

          {currentUser ? (
            <>
              <Link to="/dashboard" onClick={closeMobileMenu} className="mobile-nav-item">
                <Video size={20} />
                <span>My Courses</span>
              </Link>
              <button onClick={handleLogout} className="mobile-nav-item logout-btn">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMobileMenu} className="mobile-nav-item">
                <User size={20} />
                <span>Login</span>
              </Link>
              <Link to="/register" onClick={closeMobileMenu} className="btn-premium btn-primary w-full mt-4">
                Enroll Now
              </Link>
            </>
          )}
        </nav>
      </div>

      <style jsx="true">{`
        /* Desktop Navigation Container */
        .desktop-nav-links {
          display: none;
        }
        @media (min-width: 768px) {
          .desktop-nav-links {
            display: flex;
            align-items: center;
            gap: 2rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
          }
        }

        /* Desktop Navigation */
        .nav-item {
          background: linear-gradient(90deg, #f1c40f, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
          padding: 4px 0;
          filter: drop-shadow(0 0 1px rgba(241, 196, 15, 0.5));
        }
        .nav-item:hover {
          filter: brightness(1.3) drop-shadow(0 0 2px rgba(241, 196, 15, 0.8));
        }
        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0px;
          left: 50%;
          background: linear-gradient(90deg, #d4af37, #ffffff);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
        }
        .nav-item:hover::after {
          width: 100%;
        }

        /* Enroll Button Shine Effect */
        .btn-shine {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #d4af37, #ffffff);
          color: #000 !important;
          border: none;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        .btn-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: 0.5s;
        }
        .btn-shine:hover::before {
          left: 100%;
          transition: 0.5s;
        }
        .btn-shine:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
        }

        /* Hamburger Button */
        .hamburger-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border-radius: 8px;
        }
        .hamburger-btn:hover {
          background: rgba(212, 175, 55, 0.1);
        }
        .hamburger-btn:active {
          transform: scale(0.95);
        }

        /* Mobile Backdrop */
        .mobile-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 98;
          animation: fadeIn 0.3s ease;
        }

        /* Mobile Sidebar */
        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: -100%;
          width: 85%;
          max-width: 400px;
          height: 100vh;
          background: rgba(10, 10, 15, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid rgba(212, 175, 55, 0.2);
          z-index: 99;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
        }
        .mobile-sidebar.open {
          right: 0;
        }

        /* Mobile Sidebar Header */
        .mobile-sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(212, 175, 55, 0.05);
        }
        .close-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border-radius: 8px;
        }
        .close-btn:hover {
          background: rgba(212, 175, 55, 0.1);
          transform: rotate(90deg);
        }

        /* Mobile Navigation */
        .mobile-nav {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: transparent;
          border: 1px solid transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        .mobile-nav-item:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.3);
          transform: translateX(8px);
        }
        .mobile-nav-item:active {
          transform: translateX(8px) scale(0.98);
        }
        .mobile-nav-item svg {
          color: var(--primary);
          flex-shrink: 0;
        }
        .logout-btn {
          color: #ef4444;
        }
        .logout-btn svg {
          color: #ef4444;
        }

        /* Mobile Divider */
        .mobile-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 16px 0;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Utility Classes */
        nav {
          padding-left: 20px;
          padding-right: 20px;
        }
        .max-w-7xl {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hidden { display: none; }
        @media (min-width: 768px) {
          .md\\:flex { display: flex; }
          .md\\:hidden { display: none; }
        }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .w-full { width: 100%; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .text-white { color: white; }
        .text-primary { color: var(--primary); }
        .font-bold { font-weight: 700; }
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .transition-all { transition: all 0.3s ease; }
        .fixed { position: fixed; }
        .top-0 { top: 0; }
        .left-0 { left: 0; }
        .z-50 { z-index: 50; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
        .no-underline { text-decoration: none; }
        .tracking-tight { letter-spacing: -0.025em; }
        .tracking-widest { letter-spacing: 0.1em; }
        .mt-4 { margin-top: 1rem; }
      `}</style>
    </>
  );
}
