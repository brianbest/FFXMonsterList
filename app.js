/*
 * Modern Mobile-First FFX Monster Tracker
 * 
 * This enhanced version features a card-based UI with visual progress indicators,
 * smooth animations, and mobile-optimized interactions. The app tracks captured
 * monsters using localStorage and provides detailed monster information in modals.
 */

(() => {
  let data;
  let currentLocation = null;

  // Load the dataset
  fetch('ffx_monsters.json')
    .then((res) => res.json())
    .then((json) => {
      data = json;
      initApp();
    })
    .catch((err) => {
      console.error('Failed to load monster data:', err);
      showError('Failed to load monster data. Please refresh the page.');
    });

  function initApp() {
    const locationGrid = document.getElementById('location-grid');
    const monsterSection = document.getElementById('monster-section');
    const backBtn = document.getElementById('back-btn');
    const modal = document.getElementById('monster-detail-modal');
    const closeModal = document.getElementById('close-modal');

    // Build a lookup for item IDs to names
    const itemMap = {};
    data.items.forEach((item) => {
      itemMap[item.item_id] = item.item_name;
    });

    // Storage utilities
    function getCapturedCount(id) {
      const val = localStorage.getItem('captured_' + id);
      return val ? parseInt(val, 10) : 0;
    }

    function setCapturedCount(id, val) {
      localStorage.setItem('captured_' + id, String(val));
    }

    // Progress calculation
    function computeLocationProgress(locationId) {
      const monstersInLoc = data.monsters.filter((m) =>
        m.location_ids.includes(locationId)
      );
      const total = monstersInLoc.length;
      let captured = 0;
      monstersInLoc.forEach((m) => {
        if (getCapturedCount(m.monster_id) > 0) captured += 1;
      });
      return { total, captured, percentage: total > 0 ? Math.round((captured / total) * 100) : 0 };
    }

    // Get location icon based on name
    function getLocationIcon(locationName) {
      const icons = {
        'Besaid': '🏝️',
        'Kilika': '🌺',
        'Mi\'ihen Highroad': '🛤️',
        'Mushroom Rock Road': '🍄',
        'Djose Road': '⚡',
        'Thunder Plains': '⛈️',
        'Macalania': '❄️',
        'Bikanel': '🏜️',
        'Calm Lands': '🌾',
        'Stolen Fayth Cavern': '🕳️',
        'Mt. Gagazet': '🏔️',
        'Inside Sin': '👹',
        'Omega Ruins': '🏛️'
      };
      return icons[locationName] || '📍';
    }

    // Get monster avatar based on name/type
    function getMonsterAvatar(monsterName) {
      const avatars = {
        'flan': '🟢',
        'element': '⚡',
        'wolf': '🐺',
        'coeurl': '🐱',
        'cactuar': '🌵',
        'tonberry': '🔪',
        'behemoth': '🦣',
        'malboro': '🌿',
        'dragon': '🐉',
        'eye': '👁️',
        'fiend': '👹'
      };
      
      const name = monsterName.toLowerCase();
      for (const [key, avatar] of Object.entries(avatars)) {
        if (name.includes(key)) return avatar;
      }
      return '👾'; // default
    }

    // Render location cards
    function renderLocations() {
      locationGrid.innerHTML = '';
      
      data.locations.forEach((loc) => {
        const progress = computeLocationProgress(loc.location_id);
        const icon = getLocationIcon(loc.location_name);
        
        const card = document.createElement('div');
        card.className = 'location-card';
        card.dataset.locId = loc.location_id;
        
        card.innerHTML = `
          <div class="location-header">
            <div class="location-icon">${icon}</div>
            <div class="location-info">
              <h3>${loc.location_name}</h3>
            </div>
          </div>
          <div class="location-progress">
            <span class="progress-text">${progress.captured}/${progress.total} captured</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress.percentage}%"></div>
            </div>
            <span class="progress-percentage">${progress.percentage}%</span>
          </div>
        `;
        
        card.addEventListener('click', () => selectLocation(loc.location_id));
        locationGrid.appendChild(card);
      });
    }

    // Select location and show monsters
    function selectLocation(locationId) {
      currentLocation = locationId;
      const location = data.locations.find(l => l.location_id === locationId);
      const progress = computeLocationProgress(locationId);
      
      // Hide locations, show monsters
      document.querySelector('.locations-section').style.display = 'none';
      monsterSection.style.display = 'block';
      
      // Update section header
      document.getElementById('location-title').textContent = location.location_name;
      document.getElementById('progress-summary').innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: 0.25rem;">${progress.captured} of ${progress.total} monsters captured</div>
            <div style="font-size: 0.875rem; color: var(--text-secondary);">${progress.percentage}% complete</div>
          </div>
          <div style="font-size: 2rem;">${getLocationIcon(location.location_name)}</div>
        </div>
      `;
      
      renderMonsters(locationId);
    }

    // Render monster cards
    function renderMonsters(locationId) {
      const monsterGrid = document.getElementById('monster-grid');
      monsterGrid.innerHTML = '';
      
      const monstersInLoc = data.monsters.filter((m) =>
        m.location_ids.includes(locationId)
      );
      
      monstersInLoc.forEach((monster) => {
        const captured = getCapturedCount(monster.monster_id);
        const avatar = getMonsterAvatar(monster.name);
        
        const card = document.createElement('div');
        card.className = 'monster-card';
        
        card.innerHTML = `
          <div class="monster-header">
            <div class="monster-avatar">
              ${avatar}
              ${captured > 0 ? `<div class="captured-indicator">${captured}</div>` : ''}
            </div>
            <div class="monster-info">
              <h4>${monster.name}</h4>
              <div class="monster-hp">HP: ${monster.hp !== null && monster.hp !== undefined ? monster.hp.toLocaleString() : 'Unknown'}</div>
            </div>
          </div>
          <div class="monster-controls">
            <div class="capture-controls">
              <button class="control-btn decrease-btn" data-monster-id="${monster.monster_id}" ${captured === 0 ? 'disabled' : ''}>−</button>
              <span class="capture-count" id="count_${monster.monster_id}">${captured}</span>
              <button class="control-btn increase-btn" data-monster-id="${monster.monster_id}">+</button>
            </div>
            <button class="info-btn" data-monster-id="${monster.monster_id}">View Details</button>
          </div>
        `;
        
        monsterGrid.appendChild(card);
      });
      
      // Add event listeners to control buttons
      monsterGrid.addEventListener('click', (e) => {
        const monsterId = parseInt(e.target.dataset.monsterId);
        if (!monsterId) return;
        
        if (e.target.classList.contains('increase-btn')) {
          updateCaptureCount(monsterId, 1);
        } else if (e.target.classList.contains('decrease-btn')) {
          updateCaptureCount(monsterId, -1);
        } else if (e.target.classList.contains('info-btn')) {
          showMonsterDetails(monsterId);
        }
      });
    }

    // Update capture count
    function updateCaptureCount(monsterId, change) {
      let count = getCapturedCount(monsterId);
      count = Math.max(0, count + change);
      setCapturedCount(monsterId, count);
      
      // Update UI
      const countEl = document.getElementById(`count_${monsterId}`);
      const decreaseBtn = document.querySelector(`[data-monster-id="${monsterId}"].decrease-btn`);
      const monsterCard = countEl.closest('.monster-card');
      const avatarEl = monsterCard.querySelector('.monster-avatar');
      
      countEl.textContent = count;
      decreaseBtn.disabled = count === 0;
      
      // Update captured indicator
      const existingIndicator = avatarEl.querySelector('.captured-indicator');
      if (existingIndicator) {
        existingIndicator.remove();
      }
      
      if (count > 0) {
        const indicator = document.createElement('div');
        indicator.className = 'captured-indicator';
        indicator.textContent = count;
        avatarEl.appendChild(indicator);
      }
      
      // Update location progress (if we're in the location view)
      if (currentLocation) {
        const progress = computeLocationProgress(currentLocation);
        document.getElementById('progress-summary').innerHTML = `
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="flex: 1;">
              <div style="font-weight: 600; margin-bottom: 0.25rem;">${progress.captured} of ${progress.total} monsters captured</div>
              <div style="font-size: 0.875rem; color: var(--text-secondary);">${progress.percentage}% complete</div>
            </div>
            <div style="font-size: 2rem;">${getLocationIcon(data.locations.find(l => l.location_id === currentLocation).location_name)}</div>
          </div>
        `;
      }
      
      // Update main location grid if visible
      const locationCard = document.querySelector(`[data-loc-id="${currentLocation}"]`);
      if (locationCard && currentLocation) {
        const progress = computeLocationProgress(currentLocation);
        const progressEl = locationCard.querySelector('.location-progress');
        progressEl.innerHTML = `
          <span class="progress-text">${progress.captured}/${progress.total} captured</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress.percentage}%"></div>
          </div>
          <span class="progress-percentage">${progress.percentage}%</span>
        `;
      }
    }

    // Show monster details in modal
    function showMonsterDetails(monsterId) {
      const monster = data.monsters.find(m => m.monster_id === monsterId);
      if (!monster) return;
      
      const modalName = document.getElementById('modal-monster-name');
      const modalBody = document.getElementById('modal-monster-details');
      
      modalName.textContent = monster.name;
      
      function renderItemList(title, itemIds) {
        if (!itemIds || itemIds.length === 0) return '';
        const items = itemIds.map(id => itemMap[id] || `Unknown Item ${id}`);
        return `
          <div class="detail-section">
            <h4>${title}</h4>
            <div class="item-list">
              ${items.map(item => `<span class="item-tag">${item}</span>`).join('')}
            </div>
          </div>
        `;
      }
      
      modalBody.innerHTML = `
        <div class="detail-section">
          <h4>Monster Information</h4>
          <p><strong>HP:</strong> ${monster.hp !== null && monster.hp !== undefined ? monster.hp.toLocaleString() : 'Unknown'}</p>
          <p><strong>Captured:</strong> ${getCapturedCount(monster.monster_id)} times</p>
        </div>
        ${renderItemList('Common Steal Items', monster.steal_common_items)}
        ${renderItemList('Rare Steal Items', monster.steal_rare_items)}
        ${renderItemList('Common Drop Items', monster.drop_common_items)}
        ${renderItemList('Rare Drop Items', monster.drop_rare_items)}
      `;
      
      modal.style.display = 'flex';
    }

    // Show error message
    function showError(message) {
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: var(--error-color);
        color: white;
        padding: 1rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
      `;
      errorDiv.textContent = message;
      document.body.appendChild(errorDiv);
      
      setTimeout(() => errorDiv.remove(), 5000);
    }

    // Event listeners
    backBtn.addEventListener('click', () => {
      document.querySelector('.locations-section').style.display = 'block';
      monsterSection.style.display = 'none';
      currentLocation = null;
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (modal.style.display === 'flex') {
          modal.style.display = 'none';
        } else if (monsterSection.style.display === 'block') {
          backBtn.click();
        }
      }
    });

    // Initialize the app
    renderLocations();
  }
})();