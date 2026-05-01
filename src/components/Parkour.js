import React, { useState } from 'react';
import '../styles/Parkour.css';

const parkourIcon = `${process.env.PUBLIC_URL}/p-icon.png`;

const icon1 = `${process.env.PUBLIC_URL}/park.svg`
const icon2 = `${process.env.PUBLIC_URL}/park1.png`
const icon3 = `${process.env.PUBLIC_URL}/park2.svg`
const icon4 = `${process.env.PUBLIC_URL}/park3.svg`


// FAQ Item Component with Dropdown
const FAQItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div 
        className={`faq-question ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="faq-question-text">{question}</span>
        <span className={`faq-arrow ${isOpen ? 'open' : ''}`}>+</span>
      </div>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <div className="faq-answer-content">
          {children}
        </div>
      </div>
    </div>
  );
};

function Parkour() {
  const [isPlaying, setIsPlaying] = useState(false);
  const parkourVideo = `${process.env.PUBLIC_URL}/video.mp4`;

  const handlePlayVideo = () => {
    const video = document.getElementById('parkour-video');
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className='parkour-body' id="parkour">
      {/* Background pattern */}
      <div className="parkour-pattern"></div>

      {/* Top gradient overlay */}
      <div className="parkour-gradient-top"></div>

      <div className="parkour-container">
        
        {/* Section Title */}
        <div className="parkour-header">
          <div className="parkour-badge">DISCIPLINE</div>
          <h2 className="parkour-title">PARKOUR</h2>
          <div className="parkour-subtitle">Master Your Environment</div>
          <div className="title-underline"></div>
        </div>

        {/* Main Content Grid - Video + FAQ */}
        <div className="parkour-content-grid">
          
          {/* Left Side - Video with Creative Frame */}
          <div className="parkour-video-section">
            <div className="video-frame">
              
              {/* Video Container */}
              <div className="video-container">
               <video 
  id="parkour-video"
  className="parkour-video"
  controls={isPlaying}  
  poster={`${process.env.PUBLIC_URL}/parkour-thumbnail.jpg`}
>
  <source src={parkourVideo} type="video/mp4" />
</video>
                {/* Play Overlay */}
                {!isPlaying && (
                  <div className="video-overlay" onClick={handlePlayVideo}>
                    <div className="play-button">
                      <svg viewBox="0 0 100 100" width="80" height="80">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffffff" strokeWidth="3"/>
                        <polygon points="40,30 40,70 70,50" fill="#ffffffff"/>
                      </svg>
                    </div>
                    <p className="video-cta">Watch in Action</p>
                  </div>
                )}
              </div>

              {/* Animated energy lines */}
              <div className="energy-line line-1"></div>
              <div className="energy-line line-2"></div>
              <div className="energy-line line-3"></div>
              <div className="energy-line line-4"></div>
            </div>
          </div>

          {/* Right Side - FAQ Section */}
          <div className="parkour-info-section">
            <div className="faq-section-video">
              <h3 className="faq-title-small">FAQ</h3>
              
              <div className="faq-compact-list">
                <FAQItem question="Do I need to be fit to start?">
                  <p>No. Parkour is about progression. Everyone starts somewhere, and you'll build strength and agility as you train.</p>
                </FAQItem>

                <FAQItem question="Is parkour safe?">
                  <p>Yes, when practiced properly. Start slow, focus on technique, warm up, check surfaces, and listen to your body.</p>
                </FAQItem>

                <FAQItem question="What equipment do I need?">
                  <p>None. Just comfortable clothes and running shoes with good grip.</p>
                </FAQItem>

                <FAQItem question="How long to get good?">
                  <p>Weeks 1-4: Learn basics. Months 3-6: Build confidence. Years 1-2+: Master technique. It's a journey.</p>
                </FAQItem>
              </div>
            </div>
          </div>
        </div>

        {/* What is Parkour - Full Width Row */}
        <div className="parkour-intro-row">
          <div className="info-card intro-card">
            <div className="card-icon">
              <img src={icon1} alt="Parkour" className="card-icon-img" />
            </div>
            <h3>What is Parkour?</h3>
            <p>
              Is a practice dedicated to moving your body <strong>EFFICIENTLY</strong> and <strong>FREELY</strong> through any environment. 
              It has many forms and styles, but mainly it's about discovering the limits of your body and pushing them <strong>STEP BY STEP</strong>. 
              By doing so your body <strong>DEVELOPS</strong> all three muscle types that are essential for <strong>SPEED</strong>, <strong>ENDURANCE</strong> and <strong>CONTROL</strong>.
            </p>
          </div>
        </div>

        {/* 3 Feature Cards in One Row */}
        <div className="parkour-features-row">
          
          {/* Mental Balance Card */}
          <div className="info-card balance-card">
            <div className="card-icon"><img src={icon2} alt="" className='card-icon-2' /></div>
            <h3>Mental Balance</h3>
            <p>
              Parkour teaches you how to <strong>TRUST YOURSELF</strong>, to learn to <strong>BE CAREFUL</strong>. 
              The philosophy is always to <strong>ADVANCE</strong>, <strong>NEVER STOP</strong>. You always have obstacles in life, 
              Parkour helps you find a way to <strong>OVERCOME</strong> them in a <strong>FAST</strong>, <strong>EFFECTIVE</strong> and <strong>CREATIVE</strong> manner. 
              It's an ultimate tool to <strong>CONQUER FEARS</strong> and <strong>BALANCE</strong> your emotions.
            </p>
          </div>

          {/* Focus Card */}
          <div className="info-card focus-card">
            <div className="card-icon"><img src={icon3} alt="" className='card-icon-2' /></div>
            <h3>Focus</h3>
            <p>
              This Lifestyle pushes you to <strong>UNLOCK</strong> your innate ability to <strong>FOCUS</strong> and <strong>SHARPEN</strong> it to the point, 
              where you can <strong>CONCENTRATE</strong> on a <strong>SINGLE TASK</strong> and erase everything around it in order to <strong>ACHIEVE MAXIMUM PRODUCTIVITY</strong>.
            </p>
          </div>

          {/* Creativity Card */}
          <div className="info-card creativity-card">
            <div className="card-icon"><img src={icon4} alt="" className='card-icon-2' /></div>
            <h3>Creativity</h3>
            <p>
              Every rock, every wall, or a simple bench can be your <strong>PLAYGROUND</strong>. This <strong>MOVEMENT</strong> practice lets you <strong>REWIRE</strong> your brain, 
              to <strong>FIND OPPORTUNITIES</strong>, pushes the <strong>BOUNDARIES</strong> of your mind to <strong>ADAPT</strong> to <strong>ANY ENVIRONMENT</strong>. 
              Life is about <strong>PERSPECTIVE</strong>, any problem is just a <strong>PUZZLE</strong> waiting to be <strong>SOLVED</strong>. 
              What if you could see it from every <strong>STANDPOINT</strong>?
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
  );
}

export default Parkour;