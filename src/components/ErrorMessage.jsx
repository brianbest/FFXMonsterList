import React from 'react';

function ErrorMessage({ message, suggestion, type = 'error' }) {
  const isSearchEmpty = type === 'search-empty';
  
  return (
    <div className={`error-message ${isSearchEmpty ? 'search-empty' : ''}`}>
      <div className="error-content">
        {isSearchEmpty && <div className="error-icon">🔍</div>}
        <div className="error-text">
          <h3>{message}</h3>
          {suggestion && <p className="error-suggestion">{suggestion}</p>}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage; 