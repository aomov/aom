import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

const logo = `${process.env.PUBLIC_URL}/logo-white.png`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after click
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'KA' : 'EN');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: language === 'EN' ? 'Home' : 'მთავარი' },
    { id: 'parkour', label: language === 'EN' ? 'Disciplines' : 'პარკური' },
    { id: 'store', label: language === 'EN' ? 'Store' : 'მაღაზია' },
    { id: 'spots', label: language === 'EN' ? 'Spots' : 'სპოტები' },
    { id: 'events', label: language === 'EN' ? 'Events' : 'ივენთები' },
    { id: 'pricing', label: language === 'EN' ? 'Book Now' : 'დაჯავშნა' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => scrollToSection('home')}>
          <img src={logo} alt="AOM Logo" />
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-link"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language Toggle */}
        <div className="header-actions">
          <button 
            className="language-toggle"
            onClick={toggleLanguage}
          >
            {language}
          </button>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="mobile-nav-link"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;