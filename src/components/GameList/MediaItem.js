import React from 'react';

function MediaItem({ title, status }) {
  return (
    <div className="media-item">
      <h2>{title}</h2>
      <p>Status: {status}</p>
    </div>
  );
}

export default MediaItem;
