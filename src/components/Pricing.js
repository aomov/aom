import React, { useState } from 'react'
import '../styles/Pricing.css'

const YOGA_PLANS = [
  {
    id: 'yoga-online',
    icon: '🧘‍♀️',
    name: 'Private — Online',
    subtitle: 'Tbilisi & Online',
    pricing: [
      { price: '$40', desc: '1 Online Session' },
      { price: '$150', desc: '4 Sessions (1x weekly)' },
      { price: '$360', desc: '9 Sessions (2x weekly)' },
      { price: '$450', desc: '12 Sessions (3x weekly)' },
    ],
    includes: [
      'Full FYSM ZERO + FYSM 1',
      'Flexibility + strength + balance',
      'Hands-on adjustments',
      'Stress & tension release',
      'Nervous system balancing',
      'Movement freedom & posture',
    ],
  },
  {
    id: 'yoga-inperson',
    icon: '🧘‍♀️',
    name: 'Private — In Person',
    subtitle: '1h 20m Sessions',
    hot: true,
    pricing: [
      { price: '$55', desc: '1 Session' },
      { price: '$200', desc: '4 Sessions (1x weekly)' },
      { price: '$440', desc: '8 Sessions (2x weekly)' },
      { price: '$555', desc: '12 Sessions (3x weekly)' },
    ],
    includes: [
      'Full FYSM ZERO + FYSM 1',
      'Flexibility + strength + balance',
      'Hands-on adjustments',
      'Stress & tension release',
      'Nervous system balancing',
      'Video montage: +$55 (optional)',
    ],
  },
  {
    id: 'yoga-corporate',
    icon: '🏢',
    name: 'Corporate Yoga',
    subtitle: 'Healthier, Focused Teams',
    pricing: [
      { price: '$150', desc: '1 Session (up to 10 ppl)' },
      { price: '$555', desc: '4 Sessions/month (up to 15 ppl)' },
      { price: '$1,111', desc: '8 Sessions/month (up to 20 ppl)' },
    ],
    includes: [
      'FYSM ZERO + FYSM1',
      '80–90 min corporate flow',
      'Hands-on corrections',
      'Stress detox & focus reset',
      'Team energy alignment',
    ],
  },
]

const PARKOUR_PLANS = [
  {
    id: 'pk-private',
    icon: '🏃',
    name: 'Private Sessions',
    subtitle: 'One-on-One Guidance',
    pricing: [
      { price: '₾60', desc: 'Trial Session' },
      { price: '₾220', desc: '4 Sessions — Skill Progression' },
      { price: '₾440', desc: '8 Sessions — Mastery Path' },
    ],
    includes: [
      'Personalized skill progression',
      'Full body mechanics & safety',
      'Mindset coaching & confidence',
      'Step-by-step skill mastery',
      'Progress video: +₾100 (optional)',
    ],
  },
  {
    id: 'pk-group',
    icon: '👥',
    name: 'Group Sessions',
    subtitle: 'Train Together',
    hot: true,
    pricing: [
      { price: '₾50', desc: 'Per Person (Trio — 3 people)' },
      { price: '₾40', desc: 'Per Person (5+ people)' },
    ],
    includes: [
      'Group-based skill progression',
      'Creative flow exercises',
      'Individualized coaching',
      'Team motivation & support',
    ],
  },
  {
    id: 'pk-online',
    icon: '💻',
    name: 'Online Program',
    subtitle: 'Train From Anywhere',
    pricing: [
      { price: '₾400', desc: 'Complete Mentorship Program' },
      { price: '+₾50', desc: 'Video Call Check-in (optional)' },
    ],
    includes: [
      '5 custom tutorial videos',
      '1 bonus mindset & theory video',
      'Unlimited Q&A & video feedback',
      'Step-by-step progression plan',
      'Lifetime access to materials',
      'Progress montage: +₾100',
    ],
  },
]

const CONTACT = {
  yoga: {
    phone: 'tel:+995558108316',
    phoneLabel: '+995 558 10 83 16',
    telegram: 'https://t.me/makeurselfcomfortable',
    telegramLabel: '@makeurselfcomfortable',
  },
  parkour: {
    phone: 'tel:+995598780220',
    phoneLabel: '+995 598 78 02 20',
    telegram: 'https://t.me/Ninja_Cheff',
    telegramLabel: '@Ninja_Cheff',
  },
}

function PlanCard({ plan }) {
  return (
    <div className="pricing-card">
      {plan.hot && <div className="pricing-hot-badge">Most Popular</div>}

      <div className="pricing-card-header">
        <span className="pricing-icon">{plan.icon}</span>
        <div>
          <h3 className="pricing-name">{plan.name}</h3>
          <p className="pricing-sub">{plan.subtitle}</p>
        </div>
      </div>

      <div className="pricing-prices">
        {plan.pricing.map((p, i) => (
          <div key={i} className="pricing-price-row">
            <span className="pricing-price">{p.price}</span>
            <span className="pricing-price-desc">{p.desc}</span>
          </div>
        ))}
      </div>

      <div className="pricing-includes">
        <p className="pricing-includes-label">Includes</p>
        <ul className="pricing-includes-list">
          {plan.includes.map((item, i) => (
            <li key={i}>
              <span className="pricing-bullet">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Pricing() {
  const [tab, setTab] = useState('yoga')
  const contact = CONTACT[tab]

  return (
    <div className="pricing-body" id='pricing'>
      <div className="pricing-pattern"></div>

      <div className="pricing-container">

        <div className="pricing-header">
          <div className="pricing-badge">PRICING</div>
          <h1 className="pricing-title">Book Now</h1>
          <div className="title-underline"></div>
          <p className="pricing-subtitle">Choose Your Path</p>
        </div>

        <div className="pricing-tabs">
          <button
            className={`pricing-tab ${tab === 'yoga' ? 'active' : ''}`}
            onClick={() => setTab('yoga')}
          >
            🧘‍♀️ &nbsp; Yoga
          </button>
          <button
            className={`pricing-tab ${tab === 'parkour' ? 'active' : ''}`}
            onClick={() => setTab('parkour')}
          >
            🏃 &nbsp; Parkour
          </button>
        </div>

        {tab === 'yoga' && (
          <>
            <div className="pricing-grid">
              {YOGA_PLANS.map(plan => <PlanCard key={plan.id} plan={plan} />)}
            </div>

            <div className="pricing-extra-bar">
              <span className="pricing-extra-icon">👥</span>
              <div className="pricing-extra-info">
                <span className="pricing-extra-name">Group Sessions</span>
                <span className="pricing-extra-note">Studios or outdoor parks · FYSM ZERO + FYSM1 group flow</span>
              </div>
              <div className="pricing-extra-price-wrap">
                <span className="pricing-extra-price">$15</span>
                <span className="pricing-extra-per">per person (₾40)</span>
              </div>
            </div>

            <div className="pricing-instructor">
              Instructor: <strong>Natalie Raizer</strong>
              <span>@mentalformation</span>
            </div>
          </>
        )}

        {tab === 'parkour' && (
          <div className="pricing-grid">
            {PARKOUR_PLANS.map(plan => <PlanCard key={plan.id} plan={plan} />)}
          </div>
        )}

        <div className="pricing-cta">
          <p>Ready to start? Get in touch and we'll set everything up.</p>
          <div className="pricing-cta-btns">
            <a href={contact.phone} className="pricing-btn pricing-btn--primary">
             {contact.phoneLabel}
            </a>
            <a href={contact.telegram} target="_blank" rel="noreferrer" className="pricing-btn pricing-btn--ghost">
             {contact.telegramLabel}
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Pricing