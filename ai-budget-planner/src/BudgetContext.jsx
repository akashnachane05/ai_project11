import React, { createContext, useState } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgetData, setBudgetData] = useState(null);

  return (
    <BudgetContext.Provider value={{ budgetData, setBudgetData }}>
      {children}
    </BudgetContext.Provider>
  );
};