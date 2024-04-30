// pages/index.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0/client';
import User from '../components/user';


export default function Home() {
    const [locations, setLocations] = useState([]);
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        fetch('/api/locations')
            .then((res) => res.json())
            .then(setLocations);
    }, []);

    return (
        <div>
            <h1>Game Locations</h1>
            <User />
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
