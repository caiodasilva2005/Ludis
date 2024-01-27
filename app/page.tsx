import CreateAccountPage from "./users/components/LogIn/CreateAccountPage";
import LogIn from "./users/components/LogIn/LogIn";
import NavBar from "./users/components/NavBar/NavBar";
import ProfileDisplay from "./users/components/ProfileDisplay/ProfileDisplay";
import SideBar from "./users/components/SideBar/SideBar";
import supabase from "./config/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {});

  return (
    <main>
      <div>
        <CreateAccountPage />
      </div>
    </main>
  );
}
