import React, { useEffect } from 'react';
import { getCapturedCount } from '../utils/storage.js';

function MonsterModal({ monster, itemMap, onClose }) {
  // Handle escape key and backdrop click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderItemList = (title, itemIds) => {
    if (!itemIds || itemIds.length === 0) return null;
    const items = itemIds.map(id => itemMap[id] || `Unknown Item ${id}`);
    return (
      <div className="detail-section">
        <h4>{title}</h4>
        <div className="item-list">
          {items.map((item, index) => (
            <span key={index} className="item-tag">{item}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{monster.name}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="detail-section">
            <h4>Monster Information</h4>
            <p><strong>HP:</strong> {monster.hp !== null && monster.hp !== undefined ? monster.hp.toLocaleString() : 'Unknown'}</p>
            <p><strong>Captured:</strong> {getCapturedCount(monster.monster_id)} times</p>
          </div>
          {renderItemList('Common Steal Items', monster.steal_common_items)}
          {renderItemList('Rare Steal Items', monster.steal_rare_items)}
          {renderItemList('Common Drop Items', monster.drop_common_items)}
          {renderItemList('Rare Drop Items', monster.drop_rare_items)}
        </div>
      </div>
    </div>
  );
}

export default MonsterModal; 