import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const eventsPerPage = 4;

  const API_BASE_URL = "https://aomback.onrender.com";

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

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.eventType === filter;
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
  document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
};

  return (
    <div className='events-body' id='events'>
      <div className='events-gradient-top'></div>
      <div className='events-pattern'></div>

      <div className='events-container'>
        <div className='events-header'>
          <div className='events-badge'>OUR JOURNEY</div>
          <h1 className='events-title'>EVENTS</h1>
          <div className='title-underline'></div>
          <p className='events-subtitle'>Relive the Action</p>
        </div>

        <div className='events-filters'>
          {['all', 'upcoming', 'past'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => handleFilterChange(f)}
            >
              {f === 'all' ? 'All Events' : f === 'upcoming' ? 'Upcoming' : 'Past Events'}
            </button>
          ))}
        </div>

        <div className='events-list'>
          {loading ? (
            [1,2,3,4].map(i => (
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
            ))
          ) : currentEvents.length > 0 ? (
            currentEvents.map(event => (
              <div
                key={event._id}
                className='event-card'
                onClick={() => navigate(`/event/${event._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className='event-image-wrapper'>
                  <img
                    src={event.eventMainPicture}
                    alt={event.eventName}
                    className='event-image'
                  />
                  <div className='event-type-badge'>
                    {event.eventType === 'upcoming' ? 'Upcoming' : 'Past'}
                  </div>
                </div>
                <div className='event-content'>
                  <h3 className='event-title'>{event.eventName}</h3>
                  <p className='event-date'>
                     {new Date(event.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  <p className='event-description'>
                    {event.eventDescription.length > 200
                      ? `${event.eventDescription.substring(0, 200)}...`
                      : event.eventDescription}
                  </p>
                  {event.eventGallery && event.eventGallery.length > 0 && (
                    <div className='event-meta'>🖼️ {event.eventGallery.length} photos</div>
                  )}
                  <div className='event-read-more'>View Event →</div>
                </div>
              </div>
            ))
          ) : (
            <div className='no-events'>
              <p>No events found for this filter.</p>
            </div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className='pagination'>
            <button className='page-btn'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>← Prev</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i+1}
                className={`page-number ${currentPage === i+1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i+1)}>{i+1}</button>
            ))}
            <button className='page-btn'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;