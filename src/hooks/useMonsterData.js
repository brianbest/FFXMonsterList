import { useState, useEffect, useMemo } from 'react';
import { getCapturedCount } from '../utils/storage.js';

export function useMonsterData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the dataset
  useEffect(() => {
    fetch('/src/data/ffx_monsters.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load monster data:', err);
        setError('Failed to load monster data. Please refresh the page.');
        setLoading(false);
      });
  }, []);

  // Build item lookup map
  const itemMap = useMemo(() => {
    if (!data) return {};
    const map = {};
    data.items.forEach((item) => {
      map[item.item_id] = item.item_name;
    });
    return map;
  }, [data]);

  // Progress calculation function
  const computeLocationProgress = (locationId) => {
    if (!data) return { total: 0, captured: 0, percentage: 0 };
    
    const monstersInLoc = data.monsters.filter((m) =>
      m.location_ids.includes(locationId)
    );
    const total = monstersInLoc.length;
    let captured = 0;
    monstersInLoc.forEach((m) => {
      if (getCapturedCount(m.monster_id) > 0) captured += 1;
    });
    return { total, captured, percentage: total > 0 ? Math.round((captured / total) * 100) : 0 };
  };

  // Get item sources function
  const getItemSources = (itemId) => {
    if (!data) return { drop: {}, steal: {}, dropCount: 0, stealCount: 0 };
    
    const sources = {
      drop: {},  // locationId -> monsters
      steal: {}, // locationId -> monsters
      dropCount: 0,
      stealCount: 0
    };
    
    data.monsters.forEach((monster) => {
      // Check if monster drops this item
      if (monster.drop_common_items?.includes(itemId) || monster.drop_rare_items?.includes(itemId)) {
        monster.location_ids.forEach(locationId => {
          if (!sources.drop[locationId]) sources.drop[locationId] = [];
          sources.drop[locationId].push(monster);
        });
        sources.dropCount++;
      }
      
      // Check if monster has this item as steal
      if (monster.steal_common_items?.includes(itemId) || monster.steal_rare_items?.includes(itemId)) {
        monster.location_ids.forEach(locationId => {
          if (!sources.steal[locationId]) sources.steal[locationId] = [];
          sources.steal[locationId].push(monster);
        });
        sources.stealCount++;
      }
    });
    
    return sources;
  };

  return {
    data,
    loading,
    error,
    itemMap,
    computeLocationProgress,
    getItemSources
  };
} 