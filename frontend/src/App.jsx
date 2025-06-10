import React, { useEffect, useState } from 'react';

export default function App() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/monsters')
      .then(res => res.json())
      .then(setMonsters);
  }, []);

  return (
    <div>
      <h1>FFX Monster List</h1>
      <ul>
        {monsters.map(m => (
          <li key={m.name}>{m.name} - {m.location}</li>
        ))}
      </ul>
    </div>
  );
}
