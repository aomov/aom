import React from 'react';
import '../styles/Footer.css';

function Footer({ language = 'EN' }) {
  const navItems = [
    { id: 'home',    label: language === 'EN' ? 'Home'        : 'მთავარი' },
    { id: 'parkour', label: language === 'EN' ? 'Disciplines'  : 'პარკური' },
    { id: 'store',   label: language === 'EN' ? 'Store'        : 'მაღაზია' },
    { id: 'spots',   label: language === 'EN' ? 'Spots'        : 'სპოტები' },
    { id: 'events',  label: language === 'EN' ? 'Events'       : 'ივენთები' },
    { id: 'pricing', label: language === 'EN' ? 'Book Now'     : 'დაჯავშნა' },
  ];

  const socials = [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'IG' },
    { label: 'Telegram',  href: 'https://t.me',          icon: 'TG' },
    { label: 'YouTube',   href: 'https://youtube.com',   icon: 'YT' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-pattern" />

      <div className="footer-container">

        <div className="footer-top">

          <div className="footer-brand">
            <div className="footer-logo">AOM</div>
            <p className="footer-tagline">Move. Grow. Adapt.</p>
            <p className="footer-sub">Georgia's first Parkour &amp; Yoga fusion experience.</p>
          </div>

          <nav className="footer-nav">
            <span className="footer-nav-label">
              {language === 'EN' ? 'Navigate' : 'ნავიგაცია'}
            </span>
            <ul>
              {navItems.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-contact">
            <span className="footer-nav-label">
              {language === 'EN' ? 'Contact' : 'კონტაქტი'}
            </span>
            <a href="tel:+995574065469" className="footer-contact-link">
              <span className="footer-contact-icon">✆</span>
              +995 574 065 469
            </a>
            <a href="https://t.me/your_telegram" target="_blank" rel="noreferrer" className="footer-contact-link">
              <span className="footer-contact-icon">✈</span>
              Telegram
            </a>
            <p className="footer-location">
              <span className="footer-contact-icon">◎</span>
              Tbilisi, Georgia
            </p>
          </div>

          <div className="footer-cta">
            <span className="footer-nav-label">
              {language === 'EN' ? 'Ready?' : 'მზადა?'}
            </span>
            <button className="footer-book-btn" onClick={() => scrollTo('pricing')}>
              {language === 'EN' ? 'Book Now' : 'დაჯავშნა'}
            </button>
            <div className="footer-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="footer-social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} AOM. All rights reserved.</p>
          <p className="footer-made">Tbilisi, Georgia 🇬🇪</p>
          <p className="footer-copy">
            Designed and developed by{' '}
            <a href="https://apollocreations.net" target="_blank" rel="noreferrer" className="footer-credit-link">
              Apollo Creations
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;