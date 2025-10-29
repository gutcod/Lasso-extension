import { createContext, useContext, useState, ReactNode } from 'react';

interface EmailContextType {
  email: string;
  setEmail: (email: string) => void;
}

const EmailContext = createContext<EmailContextType | null>(null);

export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}