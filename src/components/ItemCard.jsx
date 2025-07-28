import React from 'react';
import { getItemIcon } from '../utils/icons.js';

function ItemCard({ item, sources, onClick }) {
  const icon = getItemIcon(item.item_name);
  const totalSources = sources.dropCount + sources.stealCount;

  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-header">
        <div className="item-icon">{icon}</div>
        <div className="item-info">
          <h3>{item.item_name}</h3>
          <div className="item-sources-preview">
            {totalSources} monster source{totalSources !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard; 