import React from 'react';
import '../styles/Footer.css';

function Footer({ language = 'EN', tab = 'yoga' }) {
  const navItems = [
    { id: 'home',    label: language === 'EN' ? 'Home'        : 'მთავარი' },
    { id: 'parkour', label: language === 'EN' ? 'Disciplines'  : 'პარკური' },
    { id: 'store',   label: language === 'EN' ? 'Store'        : 'მაღაზია' },
    { id: 'spots',   label: language === 'EN' ? 'Spots'        : 'სპოტები' },
    { id: 'events',  label: language === 'EN' ? 'Events'       : 'ივენთები' },
    { id: 'pricing', label: language === 'EN' ? 'Book Now'     : 'დაჯავშნა' },
  ];

  const socials = [
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    {
      label: 'Telegram',
      href: 'https://t.me/makeurselfcomfortable',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@artofmovement.geo',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
        </svg>
      ),
    },
  ];

  const contacts = [
    { phone: 'tel:+995558108316', phoneLabel: '+995 558 10 83 16', telegram: 'https://t.me/makeurselfcomfortable', telegramLabel: '@makeurselfcomfortable' },
    { phone: 'tel:+995598780220', phoneLabel: '+995 598 78 02 20', telegram: 'https://t.me/Ninja_Cheff', telegramLabel: '@Ninja_Cheff' },
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
            <p className="footer-tagline">Move. Create. Expand.</p>
            <p className="footer-sub">We unite artists, athletes, and creators to share, collaborate, and evolve through experiences that challenge the body and expand the mind.</p>
          </div>

          <nav className="footer-nav">
            <span className="footer-nav-label">
              {language === 'EN' ? 'Navigate' : 'ნავიგაცია'}
            </span>
            <ul>
              {navItems.map(item => (
                <li key={item.id}>
                  
                    <a href={`#${item.id}`}
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
            {contacts.map((c, i) => (
              <React.Fragment key={i}>
                <a href={c.phone} className="footer-contact-link">
                  <span className="footer-contact-icon">✆</span>
                  {c.phoneLabel}
                </a>
                <a href={c.telegram} target="_blank" rel="noreferrer" className="footer-contact-link">
                  <span className="footer-contact-icon">✈</span>
                  {c.telegramLabel}
                </a>
              </React.Fragment>
            ))}
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
              {language === 'EN' ? 'Join us' : 'დაჯავშნა'}
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
          <p className="footer-made">Tbilisi, Georgia</p>
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