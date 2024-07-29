import React, { createContext, useContext, useState, ReactNode } from 'react';


type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// Define the type for your context
type UserContextType =  {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context with an initial value of undefined
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Provide the context
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};