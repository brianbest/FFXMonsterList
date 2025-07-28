import React from 'react';
import MonsterCard from './MonsterCard.jsx';
import { getLocationIcon } from '../utils/icons.js';

function MonsterSection({ 
  location, 
  monsters, 
  onBack, 
  onMonsterSelect, 
  computeLocationProgress,
  triggerUpdate,
  forceUpdate
}) {
  const progress = computeLocationProgress(location.location_id);
  const icon = getLocationIcon(location.location_name);

  return (
    <div className="tab-content active">
      <section className="monster-section">
        <div className="section-header">
          <button className="back-btn" onClick={onBack}>← Back to Locations</button>
          <h2>{location.location_name}</h2>
          <div className="progress-summary">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                  {progress.captured} of {progress.total} monsters captured
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {progress.percentage}% complete
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>{icon}</div>
            </div>
          </div>
        </div>
        
        <div className="monster-grid">
          {monsters.map((monster) => (
            <MonsterCard
              key={monster.monster_id}
              monster={monster}
              onMonsterSelect={onMonsterSelect}
              triggerUpdate={triggerUpdate}
              forceUpdate={forceUpdate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MonsterSection; 