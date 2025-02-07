import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function LocationList({ locations, selectedLocation, onLocationSelect, captures, allMonstersByLocation }) {
  const renderItem = ({ item }) => {
    // Get monsters for this location from mapping
    const monstersForLocation = allMonstersByLocation[item.location_name] || [];
    const isComplete = monstersForLocation.length > 0 && monstersForLocation.every(monster => (captures[monster.fiend_id] || 0) === 10);
    return (
      <TouchableOpacity 
        style={[
          styles.locationItem,
          selectedLocation === item.location_name && styles.selectedLocation
        ]}
        onPress={() => onLocationSelect(item.location_name)}
      >
        <Text>{item.location_name}</Text>
        {isComplete && <Text style={styles.complete}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Locations</Text>
      <FlatList 
        data={locations}
        keyExtractor={item => String(item.location_id)}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  locationItem: {
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#f5f5f5'
  },
  selectedLocation: { backgroundColor: '#cce5ff' },
  complete: { color: 'green', fontWeight: 'bold' }
});

LocationList.propTypes = {
  locations: PropTypes.array.isRequired,
  selectedLocation: PropTypes.string,
  onLocationSelect: PropTypes.func.isRequired,
  captures: PropTypes.object,
  allMonstersByLocation: PropTypes.object,
};

export default LocationList; 