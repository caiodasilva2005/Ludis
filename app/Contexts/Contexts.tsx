"use client";
import React, { createContext, useState, useContext } from "react";

const UserIdContext = createContext({
  userId: 0,
  setUserId: (id: number) => {},
});

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => useContext(UserIdContext);
