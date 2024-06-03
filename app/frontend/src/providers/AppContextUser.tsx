"use client";
import { User } from "@/app/shared/src/types/users.types";
import { createContext } from "react";
import { useAuth } from "../hooks/auth.hooks";

type UserContextType = {
  currentUser: User | undefined;
  setCurrentUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

const AppContextUser: React.FC = (props) => {
  const auth = useAuth();

  return (
    <UserContext.Provider
      value={{
        currentUser: auth.currentUser,
        setCurrentUser: auth.logInCurrentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default AppContextUser;
