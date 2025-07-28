import React from 'react';
import ItemCard from './ItemCard.jsx';
import ItemDetailsSection from './ItemDetailsSection.jsx';

function ItemsTab({ 
  data, 
  selectedItem, 
  onItemSelect, 
  onMonsterSelect, 
  getItemSources 
}) {
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
        <div className="items-grid">
          {data.items.map((item) => {
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
      </section>
    </div>
  );
}

export default ItemsTab; 