import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Location() {
  const router = useRouter();
  const { id } = router.query;
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/monstersByLocation?id=${id}`)
        .then((res) => res.json())
        .then(setMonsters);
    }
  }, [id]);

  return (
    <div>
      <h1>Monsters in Location</h1>
      <ul>
        {monsters.map((monster) => (
          <li key={monster.id}>
            {monster.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
