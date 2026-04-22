import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  hasSeenWelcome: boolean;
  setHasSeenWelcome: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  return (
    <AppContext.Provider value={{ hasSeenWelcome, setHasSeenWelcome }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
