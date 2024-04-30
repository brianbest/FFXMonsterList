import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';


export default function Location() {
    const router = useRouter();
    const { id } = router.query;
    const [monsters, setMonsters] = useState([]);
    const { user } = useUser();

    const incrementMonsterCount = async (monsterId) => {
        // Logic to update the count in the state and then save to the database
        setMonsters((prevMonsters) =>
            prevMonsters.map((m) =>
                m.id === monsterId ? { ...m, count: (m.count || 0) + 1 } : m
            ),
        );
        console.log(user);

        // Call an API endpoint to increment the count in the database
        await fetch('/api/setMonsterCount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id, monsterId: monsterId, count: monsters.find((m) => m.id === monsterId).count})
        });
    };

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
                        {monster.name} - Captured: {monster.count || 0}
                        <button onClick={() => incrementMonsterCount(monster.id)}>Capture</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
