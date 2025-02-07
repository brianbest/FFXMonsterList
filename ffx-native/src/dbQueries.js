import { BASE_URL } from './api';

// Fetch all locations from the backend server
export const getLocations = (callback) => {
  fetch(`${BASE_URL}/locations`)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Error fetching locations:', error);
    });
};

// Fetch all monsters; optionally filter by location
export const getMonsters = (locationName, callback) => {
  let url = `${BASE_URL}/monsters`;
  if (locationName) {
    url += `?location=${encodeURIComponent(locationName)}`;
  }
  fetch(url)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Error fetching monsters:', error);
    });
};

// Fetch elemental weaknesses for a given monster
export const getElementalWeaknesses = (fiendId, callback) => {
  const url = `${BASE_URL}/monsters/${fiendId}/weaknesses`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Error fetching weaknesses:', error);
    });
}; 