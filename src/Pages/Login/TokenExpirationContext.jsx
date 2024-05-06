// TokenExpirationContext.js
import React, { createContext, useState, useContext } from 'react';

const TokenExpirationContext = createContext();

export const TokenExpirationProvider = ({ children }) => {
  const [expirationTime, setExpirationTime] = useState(null);

  return (
    <TokenExpirationContext.Provider value={{ expirationTime, setExpirationTime }}>
      {children}
    </TokenExpirationContext.Provider>
  );
};

export const useTokenExpiration = () => useContext(TokenExpirationContext);
