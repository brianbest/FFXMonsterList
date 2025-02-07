import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LocationList from '@/src/components/LocationList';
import MonsterList from '@/src/components/MonsterList';
import { getLocations, getMonsters } from '@/src/dbQueries';

export default function HomeScreen() {
  // State for selected location, locations & monsters from SQLite, captures from AsyncStorage, and modal visibility
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [monsters, setMonsters] = useState<any[]>([]);
  const [captures, setCaptures] = useState<{ [key: number]: number }>({});
  const [allMonstersByLocation, setAllMonstersByLocation] = useState<{ [key: string]: any[] }>({});
  const [showResetModal, setShowResetModal] = useState(false);

  // Load persisted captures from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('monsterCaptures').then((saved) => {
      if (saved) {
        setCaptures(JSON.parse(saved));
      }
    });
  }, []);

  // Persist captures to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem('monsterCaptures', JSON.stringify(captures));
  }, [captures]);

  // Get locations from SQLite
  useEffect(() => {
    getLocations((data) => {
      setLocations(data);
    });
  }, []);

  // When a location is selected, load its monsters
  useEffect(() => {
    if (selectedLocation) {
      getMonsters(selectedLocation, (data) => {
        setMonsters(data);
      });
    } else {
      setMonsters([]);
    }
  }, [selectedLocation]);

  // Also, load all monsters (without filtering) to create a mapping by location.
  useEffect(() => {
    getMonsters(null, (data) => {
      const grouped: { [key: string]: any[] } = {};
      data.forEach(monster => {
        const loc = monster.location_name;
        if (!grouped[loc]) grouped[loc] = [];
        grouped[loc].push(monster);
      });
      setAllMonstersByLocation(grouped);
    });
  }, []);

  // Function to update capture count
  const updateCapture = (monsterId: number, newCount: number) => {
    setCaptures((prev) => ({
      ...prev,
      [monsterId]: newCount,
    }));
  };

  // Reset captured data after confirmation
  const handleResetCaptures = () => {
    setCaptures({});
    setShowResetModal(false);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          FFX Monsters Offline App
        </ThemedText>
        <TouchableOpacity style={styles.resetButton} onPress={() => setShowResetModal(true)}>
          <ThemedText style={styles.resetButtonText}>Reset Captured Data</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Locations List */}
      <LocationList
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
        captures={captures}
        allMonstersByLocation={allMonstersByLocation}
      />

      {/* Monsters List */}
      <MonsterList
        monsters={monsters}
        selectedLocation={selectedLocation}
        captures={captures}
        onUpdateCapture={updateCapture}
      />

      {/* Reset Confirmation Modal */}
      <Modal
        visible={showResetModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowResetModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalText}>
              Are you sure you want to reset all captured monster data?
            </ThemedText>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setShowResetModal(false)}>
                <ThemedText>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonReset} onPress={handleResetCaptures}>
                <ThemedText style={{ color: 'white' }}>Reset Data</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  resetButtonText: {
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButtonCancel: {
    marginRight: 10,
    padding: 10,
  },
  modalButtonReset: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 4,
  },
});
