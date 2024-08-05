'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  //if user is not set or is an empty object, return a login link
  if (!user || Object.keys(user).length === 0) return <a href="/api/auth/login">Login</a>;
  

  useEffect(() => {
    console.log(user, error, isLoading);
  },[user, error, isLoading]);

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <a href="/api/auth/logout">Logout</a>
      </div>
    )
  );
}