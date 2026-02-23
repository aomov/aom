import React, { useState } from 'react';
import '../styles/Store.css';

const item1 = `${process.env.PUBLIC_URL}/item1.png`;
const item2 = `${process.env.PUBLIC_URL}/item2.png`;
const item3 = `${process.env.PUBLIC_URL}/item3.png`;
const item4 = `${process.env.PUBLIC_URL}/item4.png`;
const item5 = `${process.env.PUBLIC_URL}/item5.png`;
const item6 = `${process.env.PUBLIC_URL}/item6.png`;
const item7 = `${process.env.PUBLIC_URL}/item7.png`;

const items = [
  { id: 1, image: item1, name: 'Item 1' },
  { id: 2, image: item2, name: 'Item 2' },
  { id: 3, image: item3, name: 'Item 3' },
  { id: 4, image: item4, name: 'Item 4' },
  { id: 5, image: item5, name: 'Item 5' },
  { id: 6, image: item6, name: 'Item 6' },
  { id: 7, image: item7, name: 'Item 7' },
];

const prices = [
  '฿1,500',
  '฿2,000',
  '฿1,200',
  '฿3,500',
  '฿1,800',
  '฿2,500',
  '฿1,000',
];

function Store() {
  const [showAll, setShowAll] = useState(false);

  const getInitialItemCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768 ? 4 : 8;
    }
    return 8;
  };

  const [initialCount, setInitialCount] = useState(getInitialItemCount());

  React.useEffect(() => {
    const handleResize = () => {
      setInitialCount(window.innerWidth <= 768 ? 4 : 8);
      setShowAll(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsToShow = showAll ? items : items.slice(0, initialCount);

  return (
    <div className='store-body' id="store">
      <div className="store-pattern"></div>

      <div className="store-container">
        <div className="store-header">
          <div className="store-badge">COLLECTION</div>
          <h2 className="store-title">STORE</h2>
          <div className="store-subtitle">Premium Gear & Apparel</div>
          <div className="title-underline"></div>
        </div>

        <div className="store-items-grid">
          {itemsToShow.map((item, index) => (
            <div key={item.id} className="store-item">
              <div className="item-image-container">
                <img src={item.image} alt={item.name} className="item-image" loading="lazy" />
                <div className="item-overlay"></div>
              </div>
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-action">
                  <span className="action-text">Buy Now</span>
                  <span className="action-price">{prices[index]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && items.length > initialCount && (
          <div className="show-more-container">
            <button className="show-more-btn" onClick={() => setShowAll(true)}>
              <span className="show-more-text">Show More Items</span>
              <span className="show-more-icon">+</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Store;