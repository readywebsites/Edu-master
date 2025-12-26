import React, { useState } from 'react';
import { Bell, User, GraduationCap } from 'lucide-react';
import './AnnouncementCard.css';

export default function AnnouncementCard({ announcement }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format the date to relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  // Determine if content should be truncated
  const shouldTruncate = announcement.content.length > 150;
  const displayContent = (!isExpanded && shouldTruncate)
    ? announcement.content.substring(0, 150) + '...'
    : announcement.content;

  // Determine card styling based on author type
  const isAdmin = announcement.author_type === 'admin';
  const cardClass = isAdmin ? 'announcement-card admin' : 'announcement-card teacher';
  const iconBgClass = isAdmin ? 'icon-bg admin' : 'icon-bg teacher';

  return (
    <div className={cardClass}>
      <div className="announcement-header">
        <div className="announcement-icon-wrapper">
          <div className={iconBgClass}>
            {isAdmin ? <Bell size={20} /> : <GraduationCap size={20} />}
          </div>
        </div>
        <div className="announcement-meta">
          <div className="announcement-title">{announcement.title}</div>
          <div className="announcement-info">
            <span className="author-badge">
              {isAdmin ? '👤 Admin' : '👨‍🏫 ' + announcement.author_name}
            </span>
            {announcement.course_title && (
              <>
                <span className="separator">•</span>
                <span className="course-name">{announcement.course_title}</span>
              </>
            )}
            <span className="separator">•</span>
            <span className="timestamp">{getRelativeTime(announcement.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="announcement-content">
        <p>{displayContent}</p>
        {shouldTruncate && (
          <button
            className="read-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}
