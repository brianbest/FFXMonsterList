import React, { useState } from 'react';
import { useMonsterData } from './hooks/useMonsterData.js';
import Header from './components/Header.jsx';
import TabNavigation from './components/TabNavigation.jsx';
import LocationsTab from './components/LocationsTab.jsx';
import ItemsTab from './components/ItemsTab.jsx';
import MonsterModal from './components/MonsterModal.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

function App() {
  const { data, loading, error, itemMap, computeLocationProgress, getItemSources } = useMonsterData();
  const [activeTab, setActiveTab] = useState('locations');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Force re-render function for when capture counts change
  const triggerUpdate = () => setForceUpdate(prev => prev + 1);

  if (loading) {
    return (
      <div className="app-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.5rem',
          color: 'var(--text-secondary)'
        }}>
          Loading FFX Monster Data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLocationBack={() => setSelectedLocation(null)}
        onItemBack={() => setSelectedItem(null)}
      />
      
      <main className="main-content">
        {activeTab === 'locations' && (
          <LocationsTab
            data={data}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
            onMonsterSelect={setSelectedMonster}
            computeLocationProgress={computeLocationProgress}
            triggerUpdate={triggerUpdate}
            forceUpdate={forceUpdate}
          />
        )}
        
        {activeTab === 'items' && (
          <ItemsTab
            data={data}
            selectedItem={selectedItem}
            onItemSelect={setSelectedItem}
            onMonsterSelect={setSelectedMonster}
            getItemSources={getItemSources}
          />
        )}
      </main>
      
      {selectedMonster && (
        <MonsterModal
          monster={selectedMonster}
          itemMap={itemMap}
          onClose={() => setSelectedMonster(null)}
        />
      )}
    </div>
  );
}

export default App; 