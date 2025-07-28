import React, { useEffect } from 'react';

function TabNavigation({ activeTab, onTabChange, onLocationBack, onItemBack }) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeTab === 'locations') {
          onLocationBack();
        } else if (activeTab === 'items') {
          onItemBack();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, onLocationBack, onItemBack]);

  return (
    <nav className="tab-navigation">
      <button 
        className={`tab-btn ${activeTab === 'locations' ? 'active' : ''}`}
        onClick={() => onTabChange('locations')}
      >
        📍 Locations
      </button>
      <button 
        className={`tab-btn ${activeTab === 'items' ? 'active' : ''}`}
        onClick={() => onTabChange('items')}
      >
        💎 Items
      </button>
    </nav>
  );
}

export default TabNavigation; 