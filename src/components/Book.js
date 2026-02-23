import React, { useState, useEffect } from 'react';
import '../styles/Book.css';

// YOGA CONTENT
const YOGA_CONTENT = {
  title: {
    badge: "FYSM YOGA",
    main: "FRESH YOGA\nSYNTHESIZED\nMETHODOLOGY",
    subtitle: "Modern Movement System"
  },
  private: {
    title: "🧘‍♀️ Private Sessions",
    subtitle: "Tbilisi & Online",
    online: [
      { price: "$40", desc: "1 Online Session" },
      { price: "$150", desc: "4 Sessions (1x weekly)" },
      { price: "$360", desc: "9 Sessions (2x weekly)" },
      { price: "$450", desc: "12 Sessions (3x weekly)" }
    ],
    inPerson: [
      { price: "$55", desc: "1 Session" },
      { price: "$200", desc: "4 Sessions (1x weekly)" },
      { price: "$440", desc: "8 Sessions (2x weekly)" },
      { price: "$555", desc: "12 Sessions (3x weekly)" }
    ],
    includes: [
      "Full FYSM ZERO + FYSM 1",
      "Flexibility + strength + balance",
      "Hands-on adjustments",
      "Stress & tension release",
      "Nervous system balancing",
      "Movement freedom & posture",
      "Video montage: +$55 (optional)"
    ]
  },
  group: {
    title: "👥 Group Sessions",
    price: "$15",
    desc: "Per Person (₾40)",
    includes: [
      "ZERO + FYSM1 group flow",
      "Breathwork synchronization",
      "Individual corrections",
      "Motivating team energy"
    ],
    note: "Studios or outdoor parks"
  },
  corporate: {
    title: "🏢 Corporate Yoga",
    subtitle: "Healthier, Focused Teams",
    pricing: [
      { price: "$150", desc: "1 Session (up to 10 ppl)" },
      { price: "$555", desc: "4 Sessions/month (up to 15 ppl)" },
      { price: "$1,111", desc: "8 Sessions/month (up to 20 ppl)" }
    ],
    includes: [
      "FYSM ZERO + FYSM1",
      "80–90 min corporate flow",
      "Hands-on corrections",
      "Stress detox & focus reset",
      "Team energy alignment"
    ]
  },
  info: {
    stat: "100,000+",
    label: "People Worldwide",
    features: ["Flexibility", "Strength", "Balance", "Nervous System Reset"]
  },
  instructor: {
    name: "Natalie Raizer",
    handle: "@mentalformation"
  }
};

// PARKOUR CONTENT
const PARKOUR_CONTENT = {
  title: {
    badge: "ART OF MOVEMENT",
    main: "PARKOUR\nTRAINING",
    subtitle: "Move Past Your Limits"
  },
  private: {
    title: "🏃 Private Sessions",
    subtitle: "One-on-One Guidance",
    pricing: [
      { price: "₾60", desc: "Trial Session" },
      { price: "₾220", desc: "4 Sessions - Skill Progression" },
      { price: "₾440", desc: "8 Sessions - Mastery Path" }
    ],
    includes: [
      "Personalized skill progression",
      "Full body mechanics & safety",
      "Mindset coaching & confidence",
      "Step-by-step skill mastery",
      "Progress video: +₾100 (optional)"
    ]
  },
  group: {
    title: "👥 Group Sessions",
    subtitle: "Train Together",
    pricing: [
      { price: "₾50", desc: "Per Person (Trio - 3 people)" },
      { price: "₾40", desc: "Per Person (5+ people)" }
    ],
    includes: [
      "Group-based skill progression",
      "Creative flow exercises",
      "Individualized coaching",
      "Team motivation & support"
    ]
  },
  online: {
    title: "💻 Online Program",
    subtitle: "Train From Anywhere",
    pricing: [
      { price: "₾400", desc: "Complete Mentorship Program" },
      { price: "+₾50", desc: "Video Call Check-in (optional)" }
    ],
    includes: [
      "5 custom tutorial videos",
      "1 bonus mindset & theory video",
      "Unlimited Q&A & video feedback",
      "Step-by-step progression plan",
      "Lifetime access to materials",
      "Progress montage: +₾100"
    ]
  },
  info: {
    stat: "Master",
    label: "Movement Freedom",
    features: ["Speed", "Balance", "Confidence", "Fear Mastery"]
  }
};

function Book({ isOpen, onClose }) {
  const [hoveredSide, setHoveredSide] = useState(null);
  const [expandedYogaSection, setExpandedYogaSection] = useState(null);
  const [expandedParkourSection, setExpandedParkourSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderPriceItems = (items) => (
    items.map((item, idx) => (
      <div key={idx} className="price-item">
        <span className="price">{item.price}</span>
        <span className="desc">{item.desc}</span>
      </div>
    ))
  );

  const renderIncludes = (items) => (
    <ul className="includes-list">
      {items.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  );

  return (
    <div className={`book-container ${isVisible ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>

      {/* YOGA SIDE */}
      <div
        className={`split-side yoga-side ${hoveredSide === 'yoga' ? 'expanded' : ''} ${hoveredSide === 'parkour' ? 'compressed' : ''}`}
        onMouseEnter={() => setHoveredSide('yoga')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="animated-pattern" />
        
        <div className="side-content">
          <div className={`main-title ${hoveredSide === 'yoga' ? 'active' : ''}`}>
            <div className="badge">{YOGA_CONTENT.title.badge}</div>
            <h1 className="title">{YOGA_CONTENT.title.main.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i < 2 && <br />}</React.Fragment>
            ))}</h1>
            <div className="title-underline" />
            <p className="subtitle">{YOGA_CONTENT.title.subtitle}</p>
          </div>

          <div className={`pricing-content ${hoveredSide === 'yoga' ? 'visible' : ''}`}>
            {/* Top Row - 3 Columns */}
            <div className="pricing-top-row">
              {/* Private Sessions - Online */}
              <div 
                className={`pricing-card-compact ${expandedYogaSection === 'private' ? 'expanded' : ''}`}
                onMouseEnter={() => setExpandedYogaSection('private')}
                onMouseLeave={() => setExpandedYogaSection(null)}
              >
                <h3 className="pricing-title">{YOGA_CONTENT.private.title}</h3>
                <div className="pricing-subtitle">{YOGA_CONTENT.private.subtitle}</div>
                
                <div className="pricing-options-compact">
                  {renderPriceItems(YOGA_CONTENT.private.online)}
                </div>

                <div className={`expanded-details ${expandedYogaSection === 'private' ? 'show' : ''}`}>
                  <div className="includes-label">Includes:</div>
                  {renderIncludes(YOGA_CONTENT.private.includes.slice(0, 4))}
                </div>
              </div>

              {/* In-Person Sessions */}
              <div 
                className={`pricing-card-compact ${expandedYogaSection === 'inperson' ? 'expanded' : ''}`}
                onMouseEnter={() => setExpandedYogaSection('inperson')}
                onMouseLeave={() => setExpandedYogaSection(null)}
              >
                <h3 className="pricing-title">🧘‍♀️ In-Person</h3>
                <div className="pricing-subtitle">1h 20m Sessions</div>
                
                <div className="pricing-options-compact">
                  {renderPriceItems(YOGA_CONTENT.private.inPerson)}
                </div>

                <div className={`expanded-details ${expandedYogaSection === 'inperson' ? 'show' : ''}`}>
                  <div className="includes-label">Includes:</div>
                  {renderIncludes(YOGA_CONTENT.private.includes.slice(0, 4))}
                </div>
              </div>

              {/* Corporate */}
              <div 
                className={`pricing-card-compact ${expandedYogaSection === 'corporate' ? 'expanded' : ''}`}
                onMouseEnter={() => setExpandedYogaSection('corporate')}
                onMouseLeave={() => setExpandedYogaSection(null)}
              >
                <h3 className="pricing-title">{YOGA_CONTENT.corporate.title}</h3>
                <div className="pricing-subtitle">{YOGA_CONTENT.corporate.subtitle}</div>
                
                <div className="pricing-options-compact">
                  {renderPriceItems(YOGA_CONTENT.corporate.pricing)}
                </div>

                <div className={`expanded-details ${expandedYogaSection === 'corporate' ? 'show' : ''}`}>
                  <div className="includes-label">Includes:</div>
                  {renderIncludes(YOGA_CONTENT.corporate.includes.slice(0, 4))}
                </div>
              </div>
            </div>

            {/* Bottom Row - Group + Info */}
            <div className="pricing-bottom-row">
              {/* Group Sessions */}
              <div className="group-section">
                <h3 className="pricing-title">{YOGA_CONTENT.group.title}</h3>
                <div className="price-item-inline">
                  <span className="price">{YOGA_CONTENT.group.price}</span>
                  <span className="desc">{YOGA_CONTENT.group.desc}</span>
                </div>
              </div>

              {/* Info Box */}
              <div className="info-box-inline">
                <div className="info-stat">{YOGA_CONTENT.info.stat}</div>
                <div className="info-label">{YOGA_CONTENT.info.label}</div>
                <div className="info-features">
                  {YOGA_CONTENT.info.features.map((tag, i) => (
                    <div key={i} className="feature-tag">{tag}</div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="instructor-inline">
                <span className="instructor-name">Instructor: {YOGA_CONTENT.instructor.name}</span>
                <span className="instructor-handle">{YOGA_CONTENT.instructor.handle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARKOUR SIDE */}
      <div
        className={`split-side parkour-side ${hoveredSide === 'parkour' ? 'expanded' : ''} ${hoveredSide === 'yoga' ? 'compressed' : ''}`}
        onMouseEnter={() => setHoveredSide('parkour')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="animated-pattern" />
        
        <div className="side-content">
          <div className={`main-title ${hoveredSide === 'parkour' ? 'active' : ''}`}>
            <div className="badge">{PARKOUR_CONTENT.title.badge}</div>
            <h1 className="title">{PARKOUR_CONTENT.title.main.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i < 1 && <br />}</React.Fragment>
            ))}</h1>
            <div className="title-underline" />
            <p className="subtitle">{PARKOUR_CONTENT.title.subtitle}</p>
          </div>

          <div className={`pricing-content ${hoveredSide === 'parkour' ? 'visible' : ''}`}>
            {/* Top Row - 3 Columns */}
            <div className="pricing-top-row">
              {/* Private Sessions */}
              <div 
                className={`pricing-card-compact ${expandedParkourSection === 'private' ? 'expanded' : ''}`}
                onMouseEnter={() => setExpandedParkourSection('private')}
                onMouseLeave={() => setExpandedParkourSection(null)}
              >
                <h3 className="pricing-title">{PARKOUR_CONTENT.private.title}</h3>
                <div className="pricing-subtitle">{PARKOUR_CONTENT.private.subtitle}</div>
                
                <div className="pricing-options-compact">
                  {renderPriceItems(PARKOUR_CONTENT.private.pricing)}
                </div>

                <div className={`expanded-details ${expandedParkourSection === 'private' ? 'show' : ''}`}>
                  <div className="includes-label">Includes:</div>
                  {renderIncludes(PARKOUR_CONTENT.private.includes.slice(0, 4))}
                </div>
              </div>

              {/* Group Sessions */}
              <div 
                className={`pricing-card-compact ${expandedParkourSection === 'group' ? 'expanded' : ''}`}
                onMouseEnter={() => setExpandedParkourSection('group')}
                onMouseLeave={() => setExpandedParkourSection(null)}
              >
                <h3 className="pricing-title">{PARKOUR_CONTENT.group.title}</h3>
                <div className="pricing-subtitle">{PARKOUR_CONTENT.group.subtitle}</div>
                
                <div className="pricing-options-compact">
                  {renderPriceItems(PARKOUR_CONTENT.group.pricing)}
                </div>

                <div className={`expanded-details ${expandedParkourSection === 'group' ? 'show' : ''}`}>
                  <div className="includes-label">Includes:</div>
                  {renderIncludes(PARKOUR_CONTENT.group.includes)}
                </div>
              </div>

              {/* Online Program */}
              <div 
                className={`pricing-card-compact ${expandedParkourSection === 'online' ? 'expanded' : ''}`}
                onMouseEnter={() => setExpandedParkourSection('online')}
                onMouseLeave={() => setExpandedParkourSection(null)}
              >
                <h3 className="pricing-title">{PARKOUR_CONTENT.online.title}</h3>
                <div className="pricing-subtitle">{PARKOUR_CONTENT.online.subtitle}</div>
                
                <div className="pricing-options-compact">
                  {renderPriceItems(PARKOUR_CONTENT.online.pricing)}
                </div>

                <div className={`expanded-details ${expandedParkourSection === 'online' ? 'show' : ''}`}>
                  <div className="includes-label">Includes:</div>
                  {renderIncludes(PARKOUR_CONTENT.online.includes.slice(0, 4))}
                </div>
              </div>
            </div>

            {/* Bottom Row - Info Only */}
            <div className="pricing-bottom-row">
              <div className="info-box-inline parkour-info">
                <div className="info-stat">{PARKOUR_CONTENT.info.stat}</div>
                <div className="info-label">{PARKOUR_CONTENT.info.label}</div>
                <div className="info-features">
                  {PARKOUR_CONTENT.info.features.map((tag, i) => (
                    <div key={i} className="feature-tag">{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;