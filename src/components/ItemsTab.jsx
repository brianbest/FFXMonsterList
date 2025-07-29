import React, { useState } from 'react';
import ItemCard from './ItemCard.jsx';
import ItemDetailsSection from './ItemDetailsSection.jsx';
import SearchInput from './SearchInput.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function ItemsTab({ 
  data, 
  selectedItem, 
  onItemSelect, 
  onMonsterSelect, 
  getItemSources 
}) {
  const [filteredItems, setFilteredItems] = useState(data.items);

  const handleSearch = (searchResults) => {
    setFilteredItems(searchResults);
  };

  if (selectedItem) {
    const item = data.items.find(i => i.item_id === selectedItem);
    const sources = getItemSources(selectedItem);
    
    return (
      <ItemDetailsSection
        item={item}
        sources={sources}
        data={data}
        onBack={() => onItemSelect(null)}
        onMonsterSelect={onMonsterSelect}
      />
    );
  }

  return (
    <div className="tab-content active">
      <section className="items-section">
        <h2>Items Database</h2>
        
        <SearchInput 
          items={data.items}
          onSearch={handleSearch}
          placeholder="Search items... (e.g., 'Potion', 'Phoenix Down')"
        />

        {filteredItems.length === 0 ? (
          <ErrorMessage 
            message="No items found matching your search."
            suggestion="Try a different search term or check your spelling."
            type="search-empty"
          />
        ) : (
          <div className="items-grid">
            {filteredItems.map((item) => {
              const sources = getItemSources(item.item_id);
              return (
                <ItemCard
                  key={item.item_id}
                  item={item}
                  sources={sources}
                  onClick={() => onItemSelect(item.item_id)}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default ItemsTab; 