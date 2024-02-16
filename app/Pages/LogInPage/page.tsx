import { UserIdProvider } from "@/app/Contexts/Contexts";
import LogIn from "@/app/components/LogIn";
import React from "react";

const LogInPage = () => {
  return (
    <UserIdProvider>
      <LogIn />
    </UserIdProvider>
  );
};

export default LogInPage;
