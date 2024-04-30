import { createContext,useEffect, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children, userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      // Fetch the user data from the backend using the userId
      // and then call setUser with the fetched data.
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
