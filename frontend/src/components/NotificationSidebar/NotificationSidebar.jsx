import React from 'react';
import './NotificationSidebar.css';

const NotificationSidebar = ({ isOpen, onClose, notifications = [], onClearAll, onRemove }) => {
  return (
    <>
      <div
        className={`notification-sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <div className={`notification-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="notification-sidebar-header">
          <h3>Notifications</h3>

          <button className="close-btn-sidebar" onClick={onClose}>&times;</button>
        </div>

        <div className="notification-sidebar-content">
          {notifications.length > 0 ? (
            notifications.map(item => (
              <div key={item.id} className="notification-item">
                <div className="notification-header">
                  <h4>{item.title}</h4>
                  <button className="delete-notification-btn" onClick={() => onRemove(item.id)}>&times;</button>
                </div>
                <p>{item.message}</p>
                <span className="notification-time">{item.time}</span>
              </div>
            ))
          ) : (
            <div className="no-notifications">
              <p>No new notifications</p>
            </div>
          )}
        </div>

        <div className="notification-sidebar-footer" style={{ display: 'flex', gap: '10px' }}>
          {notifications.length > 0 && (
            <button className="clear-all-btn" onClick={onClearAll}>Clear All</button>
          )}
          <button
            className="secondary-close-btn"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              background: '#fff',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1,
              color: '#666'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
