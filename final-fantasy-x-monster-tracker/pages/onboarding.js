// pages/index.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0/client';
import User from '../components/user';


function Onboarding() {
    const { user, error, isLoading } = useUser();
    // log user when updated
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <div>
            <h1>Onboarding</h1>
            
            <User />
        </div>
    );
}

export default Onboarding;