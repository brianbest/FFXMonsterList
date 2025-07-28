import React from 'react';
import { getCapturedCount, setCapturedCount } from '../utils/storage.js';
import { getMonsterAvatar } from '../utils/icons.js';

function MonsterCard({ monster, onMonsterSelect, triggerUpdate, forceUpdate }) {
  const captured = getCapturedCount(monster.monster_id);
  const avatar = getMonsterAvatar(monster.name);

  const updateCaptureCount = (change) => {
    let count = getCapturedCount(monster.monster_id);
    count = Math.max(0, count + change);
    setCapturedCount(monster.monster_id, count);
    triggerUpdate();
  };

  return (
    <div className="monster-card">
      <div className="monster-header">
        <div className="monster-avatar">
          {avatar}
          {captured > 0 && (
            <div className="captured-indicator">{captured}</div>
          )}
        </div>
        <div className="monster-info">
          <h4>{monster.name}</h4>
          <div className="monster-hp">
            HP: {monster.hp !== null && monster.hp !== undefined ? monster.hp.toLocaleString() : 'Unknown'}
          </div>
        </div>
      </div>
      <div className="monster-controls">
        <div className="capture-controls">
          <button 
            className="control-btn decrease-btn" 
            onClick={() => updateCaptureCount(-1)}
            disabled={captured === 0}
          >
            −
          </button>
          <span className="capture-count">{captured}</span>
          <button 
            className="control-btn increase-btn" 
            onClick={() => updateCaptureCount(1)}
          >
            +
          </button>
        </div>
        <button 
          className="info-btn" 
          onClick={() => onMonsterSelect(monster)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default MonsterCard; 