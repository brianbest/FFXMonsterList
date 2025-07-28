import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      background: 'var(--error-color)',
      color: 'white',
      padding: '1rem',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 1001,
      maxWidth: '400px'
    }}>
      {message}
    </div>
  );
}

export default ErrorMessage; 