import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Spots.css';

const parkourIcon = `${process.env.PUBLIC_URL}/movemap.png`;
const yogaIcon = `${process.env.PUBLIC_URL}/yogmap.png`;
const moveIcon = `${process.env.PUBLIC_URL}/tricking.png`;

const parkmap = `${process.env.PUBLIC_URL}/parkourmap.png`;
const yogamap = `${process.env.PUBLIC_URL}/yogamap.png`;
const movemap = `${process.env.PUBLIC_URL}/trickingmap.png`;

function ChangeMapView({ spots }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (spots.length > 0) {
      const bounds = L.latLngBounds(spots.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [spots, map]);
  
  return null;
}

function Spots() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState(null);

  const spots = {
    yoga: [
      { id: 1, name: "Heroes Square", lat: 41.696444, lng: 44.782278, popular: true, description: "Open public square, perfect for morning yoga sessions" },
      { id: 2, name: "Orbeliani Park", lat: 41.697167, lng: 44.802694, popular: false, description: "Peaceful park with green grass" },
      { id: 3, name: "Baratashvili Bridge", lat: 41.697000, lng: 44.807250, popular: true, description: "Scenic bridge spot with great views" },
    ],
    parkour: [
      { id: 4, name: "Mziuri Parkour Park", lat: 41.712500, lng: 44.771778, popular: true, description: "Dedicated parkour park with obstacles" },
      { id: 5, name: "Mziuri Entrance", lat: 41.709806, lng: 44.768694, popular: false, description: "Natural obstacles and training areas" },
      { id: 6, name: "Baratashvili Statue Park", lat: 41.697278, lng: 44.809861, popular: false, description: "Urban parkour training spot" },
    ],
    tricking: [
      { id: 7, name: "Aleqsandrovi Park", lat: 41.698778, lng: 44.800361, popular: true, description: "Great for calisthenics and movement" },
      { id: 8, name: "Abanotubani", lat: 41.688083, lng: 44.810917, popular: true, description: "Historic area with varied terrain" },
      { id: 9, name: "Church Stairs", lat: 41.689167, lng: 44.804139, popular: false, description: "Perfect for stair workouts" },
      { id: 10, name: "Baratashvili", lat: 41.696250, lng: 44.803611, popular: false, description: "Open area for movement practice" },
    ]
  };

  const getFilteredSpots = () => {
    if (activeCategory === 'all') {
      return [...spots.yoga, ...spots.parkour, ...spots.tricking];
    }
    return spots[activeCategory] || [];
  };

  const getPopularSpots = () => {
    const allSpots = [...spots.yoga, ...spots.parkour, ...spots.tricking];
    return allSpots.filter(spot => spot.popular);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'yoga': return yogamap;
      case 'parkour': return parkmap;
      case 'tricking': return movemap;
      default: return movemap;
    }
  };

  const getSpotCategory = (spotId) => {
    if (spots.yoga.find(s => s.id === spotId)) return 'yoga';
    if (spots.parkour.find(s => s.id === spotId)) return 'parkour';
    return 'tricking';
  };

  const getCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const createCustomIcon = (iconUrl, isActive = false) => {
    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: isActive ? [55, 55] : [40, 40],
      iconAnchor: isActive ? [27.5, 55] : [20, 40],
      popupAnchor: [0, isActive ? -55 : -40],
      className: isActive ? 'custom-marker-icon active' : 'custom-marker-icon'
    });
  };

  return (
    <div id="spots" className="spots-section">

      <div className="parkour-header">
        <div className="parkour-badge">Utility</div>
        <h2 className="parkour-title">Spots</h2>
        <div className="parkour-subtitle">Discover new locations</div>
        <div className="title-underline"></div>
      </div>

      <div className="spots-container">

        {/* Left Side */}
        <div className="spots-left">

          {/* Category Filter */}
          <div className="category-filter">
            <div
              className={`category-item ${activeCategory === 'yoga' ? 'active' : ''}`}
              onClick={() => setActiveCategory('yoga')}
            >
              <div className="category-icon">
                <img src={yogaIcon} alt="Yoga" />
              </div>
              <p className="category-label">Yoga</p>
            </div>

            <div
              className={`category-item ${activeCategory === 'parkour' ? 'active' : ''}`}
              onClick={() => setActiveCategory('parkour')}
            >
              <div className="category-icon">
                <img src={parkourIcon} alt="Parkour" />
              </div>
              <p className="category-label">Parkour</p>
            </div>

            <div
              className={`category-item ${activeCategory === 'tricking' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tricking')}
            >
              <div className="category-icon">
                <img src={moveIcon} alt="Tricking" />
              </div>
              <p className="category-label">Tricking</p>
            </div>
          </div>

          {/* Popular Locations */}
          <div className="popular-locations">
            <h3 className="popular-title">Popular Locations</h3>
            <div className="locations-list">
              {getPopularSpots().map((spot, index) => (
                <div
                  key={spot.id}
                  className={`location-item ${selectedSpot?.id === spot.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSpot(spot)}
                >
                  <span className="location-number">{index + 1}.</span>
                  <span className="location-name">{spot.name}</span>
                  <div className="location-icon-small">
                    <img src={getCategoryIcon(getSpotCategory(spot.id))} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Filtered Locations */}
          {activeCategory !== 'all' && (
            <div className="filtered-locations">
              <h3 className="filtered-title">
                {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Spots
              </h3>
              <div className="locations-list">
                {getFilteredSpots().map((spot) => (
                  <div
                    key={spot.id}
                    className={`location-item ${selectedSpot?.id === spot.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSpot(spot)}
                  >
                    <span className="location-name">{spot.name}</span>
                    
                    <a  href={`https://www.google.com/maps?q=${spot.lat},${spot.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="location-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Leaflet Map */}
        <div className="spots-right">
          <div className="map-container">
            <MapContainer
              center={[41.6938, 44.8015]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
              className="leaflet-map"
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              <ChangeMapView spots={getFilteredSpots()} />

              {getFilteredSpots().map((spot) => (
                <Marker
                  key={spot.id}
                  position={[spot.lat, spot.lng]}
                  icon={createCustomIcon(
                    getCategoryIcon(getSpotCategory(spot.id)),
                    selectedSpot?.id === spot.id
                  )}
                  eventHandlers={{
                    click: () => setSelectedSpot(spot),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="popup-content">
                      <div className="popup-header">
                        <img
                          src={getCategoryIcon(getSpotCategory(spot.id))}
                          alt=""
                          className="popup-icon"
                        />
                        <div className="popup-category-badge">
                          {getCategoryName(getSpotCategory(spot.id))}
                        </div>
                      </div>
                      <h4 className="popup-title">{spot.name}</h4>
                      <p className="popup-description">{spot.description}</p>
                      
                       <a href={`https://www.google.com/maps?q=${spot.lat},${spot.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="popup-directions"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Spots;