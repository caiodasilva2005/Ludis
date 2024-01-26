import CreateAccountPage from "./users/components/LogIn/CreateAccountPage";
import LogIn from "./users/components/LogIn/LogIn";
import NavBar from "./users/components/NavBar/NavBar";
import ProfileDisplay from "./users/components/ProfileDisplay/ProfileDisplay";
import SideBar from "./users/components/SideBar/SideBar";

export default function Home() {
  return (
    <main>
      <div>
        <ProfileDisplay />
      </div>
    </main>
  );
}
