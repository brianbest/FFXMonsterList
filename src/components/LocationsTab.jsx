import React from 'react';
import LocationCard from './LocationCard.jsx';
import MonsterSection from './MonsterSection.jsx';

function LocationsTab({ 
  data, 
  selectedLocation, 
  onLocationSelect, 
  onMonsterSelect, 
  computeLocationProgress,
  triggerUpdate,
  forceUpdate
}) {
  if (selectedLocation) {
    const location = data.locations.find(l => l.location_id === selectedLocation);
    const monstersInLocation = data.monsters.filter(m => 
      m.location_ids.includes(selectedLocation)
    );
    
    return (
      <MonsterSection
        location={location}
        monsters={monstersInLocation}
        onBack={() => onLocationSelect(null)}
        onMonsterSelect={onMonsterSelect}
        computeLocationProgress={computeLocationProgress}
        triggerUpdate={triggerUpdate}
        forceUpdate={forceUpdate}
      />
    );
  }

  return (
    <div className="tab-content active">
      <section className="locations-section">
        <h2>Locations</h2>
        <div className="location-grid">
          {data.locations.map((location) => (
            <LocationCard
              key={location.location_id}
              location={location}
              progress={computeLocationProgress(location.location_id)}
              onClick={() => onLocationSelect(location.location_id)}
              forceUpdate={forceUpdate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LocationsTab; 