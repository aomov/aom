import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
const logo = `${process.env.PUBLIC_URL}/logo-white.png`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on resize back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 935) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => setLanguage(language === 'EN' ? 'KA' : 'EN');
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { id: 'home',     label: language === 'EN' ? 'Home'       : 'მთავარი'  },
    { id: 'parkour',  label: language === 'EN' ? 'Disciplines': 'პარკური'  },
    
    { id: 'spots',    label: language === 'EN' ? 'Spots'      : 'სპოტები'  },
    { id: 'events',   label: language === 'EN' ? 'Events'     : 'ივენთები' },
    { id: 'pricing',  label: language === 'EN' ? 'Book Now'   : 'დაჯავშნა' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">

          {/* Logo */}
          <div className="header-logo" onClick={() => scrollToSection('home')}>
            <img src={logo} alt="AOM Logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="nav-link">
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button className="language-toggle" onClick={toggleLanguage}>{language}</button>
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="AOM Logo" className="sidebar-logo" />
          <button className="sidebar-close" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="sidebar-link"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="sidebar-link-num">0{i + 1}</span>
              {item.label}
              <span className="sidebar-link-arrow">→</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-lang" onClick={toggleLanguage}>
            <span className={language === 'EN' ? 'active' : ''}>EN</span>
            <span className="sidebar-lang-sep">/</span>
            <span className={language === 'KA' ? 'active' : ''}>KA</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Header;