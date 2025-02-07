import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

function MonsterList({ monsters, selectedLocation, captures, onUpdateCapture }) {
  if (!selectedLocation) {
    return (
      <ThemedView style={styles.placeholder}>
        <ThemedText>Please select a location to view monsters.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.monsterHeading}>
        Monsters in {selectedLocation}
      </ThemedText>
      <FlatList
        data={monsters}
        keyExtractor={(item) => String(item.fiend_id)}
        renderItem={({ item }) => {
          const count = captures[item.fiend_id] || 0;
          return (
            <ThemedView style={styles.monsterCard}>
              <ThemedText style={styles.monsterName}>{item.name}</ThemedText>
              <ThemedText>HP: {item.hp}</ThemedText>
              <ThemedText>MP: {item.mp}</ThemedText>
              <ThemedText>Common Drop: {item.common_drop}</ThemedText>
              <ThemedText>Bribe Drop: {item.bribe_drop}</ThemedText>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onUpdateCapture(item.fiend_id, Math.max(count - 1, 0))}
                  disabled={count === 0}
                >
                  <ThemedText>-</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.count}>{count}</ThemedText>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onUpdateCapture(item.fiend_id, Math.min(count + 1, 10))}
                  disabled={count === 10}
                >
                  <ThemedText>+</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
}

MonsterList.propTypes = {
  monsters: PropTypes.arrayOf(
    PropTypes.shape({
      fiend_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hp: PropTypes.number.isRequired,
      mp: PropTypes.number.isRequired,
      common_drop: PropTypes.string,
      bribe_drop: PropTypes.string,
    })
  ).isRequired,
  selectedLocation: PropTypes.string,
  captures: PropTypes.object.isRequired,
  onUpdateCapture: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  placeholder: {
    padding: 16,
    alignItems: 'center',
  },
  monsterHeading: {
    marginBottom: 12,
  },
  monsterCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 12,
  },
  monsterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  count: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MonsterList; 