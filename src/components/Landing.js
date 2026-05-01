import React from 'react';
import '../styles/Landing.css';

const video = `${process.env.PUBLIC_URL}/banner.mov`;

function Landing() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-body" id="home">
      <video className="landing-video" autoPlay loop muted playsInline>
        <source src={video} type="video/mp4" />
      </video>

     

      {/* Hero Content */}
      <div className="landing-content">
        <div className="landing-hero">
          <h1 className="hero-title">MOVE, GROW, ADAPT</h1>
          <p className="hero-subtitle">Find Freedom Through Movement</p>
          <p className="hero-description">Georgia's First Parkour & Yoga Fusion Experience</p>
          
          <div className="cta-container">
           <button 
  className="cta-button primary"
  onClick={() => scrollToSection('pricing')}
>
  Create Session
</button>
            <button 
              className="cta-button secondary"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </div>

          <div className="scroll-indicator">
            <span>Scroll to Explore</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;