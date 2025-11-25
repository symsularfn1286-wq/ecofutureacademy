import { createContext, useState } from 'react';

const defaultUser = {
  balance: 75000,
  points: 1200,
  totalWeight: 48.5,
  level: 25,
  transactions: [
    { id: 1, type: 'setor', amount: 15000, weight: 6, date: '2025-11-20' },
    { id: 2, type: 'tukar', amount: -10000, reward: 'Pulsa 10.000', date: '2025-11-22' }
  ]
};

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  const updateUser = (changes) => {
    setUser(prev => {
      let newBalance = prev.balance + (changes.balance || 0);
      let newPoints = prev.points + (changes.points || 0);
      let newWeight = prev.totalWeight + (changes.totalWeight || 0);
      let newTransactions = [...prev.transactions];

      if (changes.addTransaction) {
        newTransactions.push({ ...changes.addTransaction, id: Date.now() });
      }

      const level = Math.floor(newPoints / 50); // 50 poin = 1 level

      return {
        ...prev,
        balance: newBalance,
        points: newPoints,
        totalWeight: newWeight,
        level,
        transactions: newTransactions
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}