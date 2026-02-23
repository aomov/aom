import React, { useState, useEffect, useCallback } from "react";
import "../styles/Admin.css";

function Admin() {
  // --- State Variables ---
  const [mainPictureFile, setMainPictureFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("upcoming");
  
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({});
  
  // Edit mode state
  const [editingEventId, setEditingEventId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = "https://aomback.onrender.com";

  // --- Handlers for Input Changes ---
  const handleMainPictureChange = (e) => {
    const file = e.target.files[0];
    setMainPictureFile(file);
    setMessage(file ? `✅ Main picture selected: ${file.name}` : "");
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    setMessage(files.length > 0 ? `✅ Selected ${files.length} gallery image(s)` : "");
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setMessage(file ? `✅ Video selected: ${file.name}` : "");
  };

  // --- Clear Form Helper ---
  const clearForm = () => {
    setEventName("");
    setEventDescription("");
    setEventDate("");
    setEventType("upcoming");
    setMainPictureFile(null);
    setGalleryFiles([]);
    setVideoFile(null);
    setMessage("");
    
    // Clear file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  };

  // --- Edit Mode Functions ---
  const startEdit = (event) => {
    setIsEditing(true);
    setEditingEventId(event._id);
    
    setEventName(event.eventName || "");
    setEventDescription(event.eventDescription || "");
    setEventDate(event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : "");
    setEventType(event.eventType || "upcoming");
    
    setMessage(`✏️ Editing mode active. Modify fields and click "Update" to save changes.`);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingEventId(null);
    clearForm();
  };

  // --- File Upload/Update Logic ---
  const handleUpload = async () => {
    // Validation
    if (!eventName.trim()) {
      setMessage("❌ Please enter the event name");
      return;
    }
    if (!eventDescription.trim()) {
      setMessage("❌ Please enter the event description");
      return;
    }
    if (!eventDate.trim()) {
      setMessage("❌ Please select the event date");
      return;
    }
    if (!eventType.trim()) {
      setMessage("❌ Please select event type (upcoming/past)");
      return;
    }
    if (!isEditing && !mainPictureFile) {
      setMessage("❌ Please select a main picture for the event");
      return;
    }

    // Prepare Upload/Update
    setIsUploading(true);
    setMessage(isEditing ? "⏳ Updating..." : "⏳ Uploading...");
    
    try {
      const endpoint = isEditing 
        ? `${API_BASE_URL}/events/${editingEventId}`
        : `${API_BASE_URL}/events/upload`;
      
      const formData = new FormData();
      formData.append("eventName", eventName.trim());
      formData.append("eventDescription", eventDescription.trim());
      formData.append("eventDate", eventDate.trim());
      formData.append("eventType", eventType.trim());
      
      if (mainPictureFile) {
        formData.append("mainPicture", mainPictureFile);
      }
      
      if (galleryFiles.length > 0) {
        galleryFiles.forEach(file => {
          formData.append("gallery", file);
        });
      }

      // Make API Call
      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        if (isEditing) {
          setMessage(`✅ Event updated successfully!`);
          
          // Update event in list
          if (data.event) {
            setEvents(prevEvents =>
              prevEvents.map(event => event._id === editingEventId ? data.event : event)
            );
          }
          
          // If there's a video file, upload it separately
          if (videoFile) {
            await uploadVideo(editingEventId);
          }
          
          cancelEdit();
        } else {
          setMessage(`✅ Event created successfully!`);
          
          // Add new event to list
          if (data.event) {
            setEvents(prevEvents => [data.event, ...prevEvents]);
            
            // If there's a video file, upload it separately
            if (videoFile) {
              await uploadVideo(data.event._id);
            }
          }
        }

        // Clear form fields
        clearForm();

        // Refresh stats and events
        loadEvents();
        loadStats();
      } else {
        setMessage(`❌ ${isEditing ? 'Update' : 'Upload'} failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(`${isEditing ? 'Update' : 'Upload'} error:`, err);
      setMessage(`❌ ${isEditing ? 'Update' : 'Upload'} failed: Network error. Make sure the server is running.`);
    } finally {
      setIsUploading(false);
    }
  };

  // --- Upload Video Separately ---
  const uploadVideo = async (eventId) => {
    if (!videoFile) return;

    try {
      const formData = new FormData();
      formData.append("video", videoFile);

      const res = await fetch(`${API_BASE_URL}/events/${eventId}/video`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage(prev => prev + " | ✅ Video uploaded successfully!");
      } else {
        setMessage(prev => prev + " | ⚠️ Video upload failed");
      }
    } catch (err) {
      console.error("Video upload error:", err);
      setMessage(prev => prev + " | ⚠️ Video upload failed");
    }
  };

  // --- Fetching Events ---
  const loadEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      if (!res.ok) {
        if (res.status === 404) {
          setEvents([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Loaded events:', data.events); // Debug log
      setEvents(data.events || []);
    } catch (err) {
      console.error("Error loading events:", err);
      setEvents([]);
    }
  }, []);

  // --- Fetching Upload Statistics ---
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      if (res.ok) {
        const data = await res.json();
        const eventsArray = data.events || [];
        const upcoming = eventsArray.filter(e => e.eventType === 'upcoming').length;
        const past = eventsArray.filter(e => e.eventType === 'past').length;
        setStats({ total: eventsArray.length, upcoming, past });
      }
    } catch (err) {
      console.error("Error loading stats:", err);
      setStats({});
    }
  }, []);

  // --- Deleting an Event ---
  const deleteEvent = async (eventId, eventName) => {
    if (!window.confirm(`Are you sure you want to delete "${eventName}"?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ "${eventName}" deleted successfully!`);
        setEvents(prevEvents =>
          prevEvents.filter(event => event._id !== eventId)
        );
        
        // If we were editing this event, cancel edit mode
        if (editingEventId === eventId) {
          cancelEdit();
        }
        
        loadStats();
      } else {
        setMessage(`❌ Delete failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ Delete failed: Network error.");
    }
  };

  // --- Effect Hooks ---
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // --- JSX Rendering ---
  return (
    <div className="admin-container">
      <h2 className="admin-title">🎉 AOM Events - Admin Panel</h2>
      
      {/* Stats Display */}
      <div className="stats-section">
        <h3 className="stats-title">📊 Events Statistics:</h3>
        {Object.keys(stats).length > 0 ? (
          <div className="stats-grid">
            <div className="stat-card">
              <strong>Total Events:</strong> {stats.total || 0}
            </div>
            <div className="stat-card">
              <strong>Upcoming:</strong> {stats.upcoming || 0}
            </div>
            <div className="stat-card">
              <strong>Past:</strong> {stats.past || 0}
            </div>
          </div>
        ) : (
          <p className="no-stats">Statistics not available. Try uploading events!</p>
        )}
      </div>

      {/* Upload Form */}
      <div className="upload-form">
        <h3 className="form-title">
          {isEditing ? '✏️ Edit Event' : '📤 Add New Event'}
        </h3>
        
        {isEditing && (
          <div className="edit-mode-banner">
            <p>✏️ Editing mode active - Make changes and click "Update"</p>
            <button onClick={cancelEdit} className="cancel-edit-button">
              ❌ Cancel Edit
            </button>
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Event Name * :</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            disabled={isUploading}
            className="form-input2"
            placeholder="Enter event name"
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Event Description * :</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            disabled={isUploading}
            className="form-textarea"
            placeholder="Enter event description"
            maxLength={5000}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Event Date * :</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            disabled={isUploading}
            className="form-input2"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Event Type * :</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            disabled={isUploading}
            className="form-select"
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <small className="form-hint">
            💡 Select whether this is an upcoming or past event
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">
            Main Event Picture {isEditing ? '(Optional - leave empty to keep current)' : '*'} :
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainPictureChange}
            disabled={isUploading}
            className="form-file-input"
          />
          {isEditing && (
            <small className="form-hint">
              💡 Upload a new image to replace the existing one
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Event Gallery (Optional, up to 10 images):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            disabled={isUploading}
            className="form-file-input"
          />
          <small className="form-hint">
            💡 Select multiple images for the event gallery
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">Event Video (Optional):</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            disabled={isUploading}
            className="form-file-input"
          />
          <small className="form-hint">
            💡 Upload a video for the event (max 100MB)
          </small>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`upload-button ${isUploading ? 'disabled' : ''}`}
        >
          {isUploading ? '⏳ Processing...' : isEditing ? '✅ Update Event' : '📤 Upload Event'}
        </button>

        {message && (
          <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Events List Display */}
      <div className="items-section">
        <h3 className="items-title">
          🎉 All Events ({events.length})
        </h3>
        
        {events.length > 0 ? (
          <div className="items-grid">
            {events.map((event) => {
              const isCurrentlyEditing = editingEventId === event._id;
              
              console.log('Rendering event:', event); // Debug log
              
              return (
                <div key={event._id} className={`item-card ${isCurrentlyEditing ? 'editing' : ''}`}>
                  {event.eventMainPicture && (
                    <img
                      src={event.eventMainPicture}
                      alt={event.eventName || 'Event'}
                      className="item-image"
                      onError={(e) => {
                        console.error('Image failed to load:', event.eventMainPicture);
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <div className="item-content">
                    <h4 className="item-title">{event.eventName || 'Untitled Event'}</h4>
                    
                    <div className="item-details">
                      <p><strong>📅 Date:</strong> {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'No date'}</p>
                      <p><strong>📌 Type:</strong> {event.eventType === 'upcoming' ? '🔜 Upcoming' : '✅ Past'}</p>
                      {event.eventVideo && <p><strong>🎥 Has Video:</strong> Yes</p>}
                      {event.eventGallery && event.eventGallery.length > 0 && (
                        <p><strong>🖼️ Gallery:</strong> {event.eventGallery.length} image(s)</p>
                      )}
                    </div>
                    
                    {event.eventDescription && (
                      <p className="item-description">
                        {event.eventDescription.length > 150
                          ? `${event.eventDescription.substring(0, 150)}...`
                          : event.eventDescription
                        }
                      </p>
                    )}

                    <div className="item-actions">
                      <button
                        onClick={() => startEdit(event)}
                        className="edit-button"
                        disabled={isEditing}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(event._id, event.eventName || 'this event')}
                        className="delete-button"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-items">
            No events uploaded yet. Create your first event!
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;