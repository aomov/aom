import React, { useState } from 'react';
import '../styles/Yoga.css';

const yogaIcon = `${process.env.PUBLIC_URL}/y-icon.png`;
const icon1 = `${process.env.PUBLIC_URL}/med.svg`
const icon2 = `${process.env.PUBLIC_URL}/med1.svg`
const icon3 = `${process.env.PUBLIC_URL}/med2.svg`
const icon4 = `${process.env.PUBLIC_URL}/med3.svg`

function Yoga() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <div className='yoga-body' id="yoga">
        {/* Background pattern */}
        <div className="yoga-pattern"></div>

        {/* Top gradient overlay */}
        <div className="yoga-gradient-top"></div>

        <div className="yoga-container">
          
          {/* Section Title */}
          <div className="yoga-header">
            <div className="yoga-badge">BALANCE</div>
            <h2 className="yoga-title">FYSM YOGA</h2>
            <div className="yoga-subtitle">Modern Yoga Revolution</div>
            <div className="title-underline"></div>
          </div>

          {/* Main Content Grid */}
          <div className="yoga-content-grid">
            
            {/* Left Side - Video with Creative Frame */}
            <div className="yoga-video-section">
              <div className="video-frame">
                
                {/* Video Container */}
                <div className="video-container">
                  {!isPlaying ? (
                    <div
                      className="video-overlay"
                      onClick={handlePlayVideo}
                      style={{
                        backgroundImage: 'url(https://img.youtube.com/vi/PJuzjUHSCwY/maxresdefault.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="play-button">
                        <svg viewBox="0 0 100 100" width="80" height="80">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffffff" strokeWidth="3"/>
                          <polygon points="40,30 40,70 70,50" fill="#ffffffff"/>
                        </svg>
                      </div>
                      <p className="video-cta">Watch Demo</p>
                    </div>
                  ) : (
                    <iframe
                      className="yoga-video"
                      src="https://www.youtube.com/embed/PJuzjUHSCwY?autoplay=1"
                      title="FYSM Yoga"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>

                {/* Animated energy lines */}
                <div className="energy-line line-1"></div>
                <div className="energy-line line-2"></div>
                <div className="energy-line line-3"></div>
                <div className="energy-line line-4"></div>
              </div>
            </div>

            {/* Right Side - Info Cards */}
            <div className="yoga-info-section">
              
              {/* What is FYSM Yoga Card - Full Width */}
              <div className="info-card intro-card">
                <div className="card-icon">
                  <img src={icon1} alt="FYSM Yoga" className="card-icon-img" />
                </div>
                <h3>What is FYSM Yoga?</h3>
                <h4 className="card-subtitle">The Fresh Yoga Synthesized Methodology</h4>
                <p>
                  Developed through <strong>16+ years of expertise</strong>, FYSM is a proven yoga methodology with real-world results. 
                  With over <strong>100,000 practitioners worldwide</strong>, including athletes, entrepreneurs, actors, doctors, and freedivers, 
                  FYSM is a trusted system for achieving peak physical and mental performance.
                </p>
              </div>

            </div>
          </div>

          {/* 3 Feature Cards in One Row - Below Everything */}
          <div className="yoga-features-row">

            {/* Modern Revolution Card */}
            <div className="info-card revolution-card">
              <div className="card-icon">
                <img src={icon3} alt="FYSM Yoga" className="card-icon-img" />
              </div>
              <h3>Modern Revolution</h3>
              <p>
                FYSM Yoga is a revolutionary, <strong>science-backed system</strong> designed for modern people who seek maximum results in minimal time 
                while ensuring safety, accessibility, and efficiency.
              </p>
            </div>

            {/* Fast Transformation Card */}
            <div className="info-card transformation-card">
              <div className="card-icon">
                <img src={icon2} alt="FYSM Yoga" className="card-icon-img" />
              </div>
              <h3>Fast Transformation</h3>
              <p>
                FYSM delivers <strong>rapid improvements</strong> in flexibility, strength, posture, and mental clarity 
                with sessions of <strong>20, 30, or 60 minutes</strong>.
              </p>
            </div>

            {/* Safety First Card */}
            <div className="info-card safety-card">
              <div className="card-icon">
                <img src={icon4} alt="FYSM Yoga" className="card-icon-img" />
              </div>
              <h3>Safety First</h3>
              <p>
                FYSM eliminates unsafe postures from beginner levels. 
                It follows a <strong>level-based progression system</strong>, 
                allowing you to build a solid foundation before advancing.
              </p>
            </div>

          </div>

          {/* Book Now Button Section */}
          <div className="book-now-section">
            <button
              className="book-now-button"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Now
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Yoga;