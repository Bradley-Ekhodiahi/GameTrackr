import React from 'react';
import MediaItem from './MediaItem';

function MediaList() {
  // Mock data for now
  const games = [
    { id: 1, title: 'The Legend of Zelda: Breath of the Wild', status: 'Completed' },
    { id: 2, title: 'God of War (2018)', status: 'Playing' },
    { id: 3, title: 'Hollow Knight', status: 'Backlog' },
  ];

  return (
    <div className="media-list">
      {games.map((game) => (
        <MediaItem key={game.id} title={game.title} status={game.status} />
      ))}
    </div>
  );
}

export default MediaList;
