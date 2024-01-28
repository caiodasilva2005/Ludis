import CreateAccountPage from "./components/CreateAccountPage";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import ProfileDisplay from "./components/ProfileDisplay";
import SideBar from "./components/SideBar";
import supabase from "./config/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main>
      <div>
        <CreateAccountPage />
      </div>
    </main>
  );
}
