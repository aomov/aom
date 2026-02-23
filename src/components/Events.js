import React, { useState, useEffect } from 'react';
import '../styles/Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  const API_BASE_URL = "https://aomback.onrender.com";

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data.events || []);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.eventType === filter;
  });

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='events-body' id='events'>
      <div className='events-gradient-top'></div>
      <div className='events-pattern'></div>

      <div className='events-container'>
        {/* Header */}
        <div className='events-header'>
          <div className='events-badge'>OUR JOURNEY</div>
          <h1 className='events-title'>EVENTS</h1>
          <div className='title-underline'></div>
          <p className='events-subtitle'>Relive the Action</p>
        </div>

        {/* Filter Tabs */}
        <div className='events-filters'>
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Events
          </button>
          <button 
            className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => handleFilterChange('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
            onClick={() => handleFilterChange('past')}
          >
            Past Events
          </button>
        </div>

        {/* Events List */}
        <div className='events-list'>
          {loading ? (
            // Skeleton Loading
            <>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className='event-card skeleton'>
                  <div className='event-image-skeleton'></div>
                  <div className='event-content'>
                    <div className='skeleton-line title'></div>
                    <div className='skeleton-line date'></div>
                    <div className='skeleton-line'></div>
                    <div className='skeleton-line'></div>
                    <div className='skeleton-line short'></div>
                  </div>
                </div>
              ))}
            </>
          ) : currentEvents.length > 0 ? (
            currentEvents.map(event => (
              <div key={event._id} className='event-card'>
                <div className='event-image-wrapper'>
                  <img 
                    src={event.eventMainPicture} 
                    alt={event.eventName}
                    className='event-image'
                  />
                  <div className='event-type-badge'>
                    {event.eventType === 'upcoming' ? '🔜 Upcoming' : '✅ Past'}
                  </div>
                </div>
                <div className='event-content'>
                  <h3 className='event-title'>{event.eventName}</h3>
                  <p className='event-date'>
                    📅 {new Date(event.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className='event-description'>
                    {event.eventDescription.length > 200
                      ? `${event.eventDescription.substring(0, 200)}...`
                      : event.eventDescription
                    }
                  </p>
                  {event.eventGallery && event.eventGallery.length > 0 && (
                    <div className='event-meta'>
                      🖼️ {event.eventGallery.length} photos
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='no-events'>
              <p>No events found for this filter.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className='pagination'>
            <button 
              className='page-btn'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button 
              className='page-btn'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;