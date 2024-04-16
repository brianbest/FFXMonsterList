// pages/index.js
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/api/locations')
      .then((res) => res.json())
      .then(setLocations);
  }, []);

  return (
    <div>
      <h1>Game Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <Link href={`/locations/${location.id}`} passHref>
              {location.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
