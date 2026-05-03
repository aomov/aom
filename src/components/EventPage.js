import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/EventPage.css'

const API_BASE_URL = 'https://aomback.onrender.com'

function EventPage() {
  const { id: eventId } = useParams()
  const navigate = useNavigate()
  const onBack = () => navigate(-1)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    if (!eventId) return
    setLoading(true)
    fetch(`${API_BASE_URL}/events/${eventId}`)
      .then(r => r.json())
      .then(data => {
        const ev = data.event || data
        setEvent(ev)
        setActiveImg(ev.eventMainPicture)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [eventId])

  const allImages = event ? [event.eventMainPicture, ...(event.eventGallery || [])] : []

  const openLightbox = (img) => {
    const idx = allImages.indexOf(img)
    setLightboxIndex(idx >= 0 ? idx : 0)
    setLightbox(img)
  }

  const nextLightbox = () => {
    const next = (lightboxIndex + 1) % allImages.length
    setLightboxIndex(next)
    setLightbox(allImages[next])
  }

  const prevLightbox = () => {
    const prev = (lightboxIndex - 1 + allImages.length) % allImages.length
    setLightboxIndex(prev)
    setLightbox(allImages[prev])
  }

  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight' && lightbox) nextLightbox()
      if (e.key === 'ArrowLeft' && lightbox) prevLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, lightboxIndex, allImages])

  if (loading) return (
    <div className="event-page-container event-page-loading">
      <div className="event-page-spinner" />
      <p className="event-page-loading-text">Loading Event...</p>
    </div>
  )

  if (!event) return (
    <div className="event-page-container event-page-error">
      <p>Event not found.</p>
      <button className="event-page-back-btn" onClick={onBack}>← Back to Events</button>
    </div>
  )

  const gallery = event.eventGallery || []
  const isUpcoming = event.eventType === 'upcoming'
  const dateStr = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : null

  return (
    <div className="event-page-container">

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="event-page-lightbox" onClick={() => setLightbox(null)}>
          <button className="event-page-lb-close" onClick={() => setLightbox(null)}>✕</button>
          {allImages.length > 1 && <>
            <button className="event-page-lb-nav event-page-lb-prev"
              onClick={e => { e.stopPropagation(); prevLightbox() }}>❮</button>
            <button className="event-page-lb-nav event-page-lb-next"
              onClick={e => { e.stopPropagation(); nextLightbox() }}>❯</button>
          </>}
          <img src={lightbox} alt="" className="event-page-lb-img" onClick={e => e.stopPropagation()} />
          <div className="event-page-lb-counter">{lightboxIndex + 1} / {allImages.length}</div>
        </div>
      )}

      {/* ── Hero ── */}
      <div className="event-page-hero">
        <img src={activeImg || event.eventMainPicture} alt={event.eventName} className="event-page-hero-img" />
        <div className="event-page-hero-overlay" />
        <div className="event-page-hero-grain" />
        <div className="event-page-hero-scanlines" />

        <button className="event-page-back-btn" onClick={onBack}>← All Events</button>

        <div className="event-page-hero-content">
          <div className="event-page-hero-top">
            <span className={`event-page-type-badge ${isUpcoming ? 'upcoming' : 'past'}`}>
              {isUpcoming ? 'Upcoming' : 'Past Event'}
            </span>
            {dateStr && <span className="event-page-hero-date">{dateStr}</span>}
          </div>
          <h1 className="event-page-title">{event.eventName}</h1>
          <div className="event-page-title-line" />
          <div className="event-page-hero-stats">
            {gallery.length > 0 && <span className="event-page-stat">🖼 {gallery.length} Photos</span>}
            {event.eventVideo && <span className="event-page-stat">🎥 Video</span>}
          </div>
        </div>

        <div className="event-page-hero-fade" />
      </div>

      {/* ── Body ── */}
      <div className="event-page-body">

        {/* Description */}
        <section className="event-page-section">
          <div className="event-page-section-header">
            <span className="event-page-section-label">About this Event</span>
          </div>
          <p className="event-page-description">{event.eventDescription}</p>
        </section>

        {/* Thumb strip */}
        {gallery.length > 0 && (
          <div className="event-page-thumb-strip">
            <div
              className={`event-page-thumb ${activeImg === event.eventMainPicture ? 'active' : ''}`}
              onClick={() => setActiveImg(event.eventMainPicture)}
            >
              <img src={event.eventMainPicture} alt="main" />
              <span className="event-page-thumb-label">Main</span>
            </div>
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`event-page-thumb ${activeImg === img ? 'active' : ''}`}
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt={`${i + 1}`} />
              </div>
            ))}
          </div>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="event-page-section">
            <div className="event-page-section-header">
              <span className="event-page-section-label">Gallery</span>
              <span className="event-page-section-count">{gallery.length} Photos</span>
            </div>
            <div className="event-page-gallery">
              <div className="event-page-gallery-main" onClick={() => openLightbox(event.eventMainPicture)}>
                <img src={event.eventMainPicture} alt="main" />
                <div className="event-page-gallery-overlay"><span>⤢</span></div>
              </div>
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className={`event-page-gallery-cell event-page-gallery-cell-${(i % 3) + 1}`}
                  onClick={() => openLightbox(img)}
                >
                  <img src={img} alt={`photo ${i + 1}`} />
                  <div className="event-page-gallery-overlay"><span>⤢</span></div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {event.eventVideo && (
          <section className="event-page-section">
            <div className="event-page-section-header">
              <span className="event-page-section-label">Event Video</span>
            </div>
            <div className="event-page-video-wrap">
              <video controls className="event-page-video" poster={event.eventMainPicture}>
                <source src={event.eventVideo} />
              </video>
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="event-page-footer">
          <button className="event-page-footer-btn" onClick={onBack}>← Back to All Events</button>
        </div>

      </div>
    </div>
  )
}

export default EventPage