import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';

function SearchInput({ items, onSearch, placeholder = "Search items..." }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Configure Fuse.js for fuzzy search
  const fuse = new Fuse(items, {
    keys: ['item_name'],
    threshold: 0.3, // Lower = more strict, higher = more fuzzy
    includeScore: true,
    minMatchCharLength: 1,
  });

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch(items); // Show all items when search is empty
      return;
    }

    // Perform fuzzy search
    const results = fuse.search(query);
    const matchedItems = results.map(result => result.item);
    setSuggestions(results.slice(0, 8)); // Limit to 8 suggestions
    setShowSuggestions(true);
    setActiveSuggestion(-1);
    
    // Update filtered items
    onSearch(matchedItems);
  }, [query, items, onSearch, fuse]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.item.item_name);
    setShowSuggestions(false);
    onSearch([suggestion.item]);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder={placeholder}
          className="search-input"
        />
        {query && (
          <button 
            className="search-clear-btn" 
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <div className="search-icon">🔍</div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.item.item_id}
              className={`search-suggestion ${index === activeSuggestion ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-name">{suggestion.item.item_name}</span>
              <span className="suggestion-score">
                {Math.round((1 - suggestion.score) * 100)}% match
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput; 