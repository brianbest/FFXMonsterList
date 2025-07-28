import React from 'react';
import { getLocationIcon, getMonsterAvatar } from '../utils/icons.js';

function ItemDetailsSection({ item, sources, data, onBack, onMonsterSelect }) {
  const renderSourceSection = (title, sourceData, icon) => {
    if (Object.keys(sourceData).length === 0) return null;

    return (
      <div className="source-section">
        <h3>{icon} {title}</h3>
        <div className="source-locations">
          {Object.entries(sourceData).map(([locationId, monsters]) => {
            const location = data.locations.find(l => l.location_id == locationId);
            return (
              <div key={locationId} className="source-location">
                <h4>
                  {getLocationIcon(location.location_name)} {location.location_name}
                </h4>
                <div className="monster-list">
                  {monsters.map((monster) => (
                    <span
                      key={monster.monster_id}
                      className="monster-badge"
                      onClick={() => onMonsterSelect(monster)}
                    >
                      {getMonsterAvatar(monster.name)} {monster.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="tab-content active">
      <section className="item-details-section">
        <div className="section-header">
          <button className="back-btn" onClick={onBack}>← Back to Items</button>
          <h2>{item.item_name}</h2>
        </div>
        
        <div className="item-sources">
          {renderSourceSection('Dropped by Monsters', sources.drop, '💰')}
          {renderSourceSection('Stolen from Monsters', sources.steal, '🥷')}
          
          {Object.keys(sources.drop).length === 0 && Object.keys(sources.steal).length === 0 && (
            <div className="source-section">
              <h3>No Sources Found</h3>
              <p>This item is not dropped or stolen by any monsters in the database.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ItemDetailsSection; 