import React from 'react';
import { getLocationIcon } from '../utils/icons.js';

function LocationCard({ location, progress, onClick, forceUpdate }) {
  const icon = getLocationIcon(location.location_name);
  
  return (
    <div className="location-card" onClick={onClick}>
      <div className="location-header">
        <div className="location-icon">{icon}</div>
        <div className="location-info">
          <h3>{location.location_name}</h3>
        </div>
      </div>
      <div className="location-progress">
        <span className="progress-text">{progress.captured}/{progress.total} captured</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress.percentage}%` }}></div>
        </div>
        <span className="progress-percentage">{progress.percentage}%</span>
      </div>
    </div>
  );
}

export default LocationCard; 