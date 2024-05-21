"use client";
import ProfileDisplays from "./frontend/src/components/ProfileDisplays";
import SideBar from "./frontend/src/components/SideBar";
import { useEffect, useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import NavBar from "./frontend/src/components/NavBar";
import MenuIcon from "@mui/icons-material/Menu";
import { User } from "./shared/src/types/users.types";
import { Filter } from "./shared/src/types/filters.types";
import { useAllUsers, useCurrentUser } from "./frontend/src/hooks/users.hooks";
import { filterChange } from "./frontend/src/utils/filters";
import { getAllMatches } from "./frontend/src/utils/users";
import ProgressIndicator from "./frontend/src/components/ProgressIndicator";

export default function Home() {
  const [filter, setFilter] = useState<Filter>({
    gender: { filMale: false, filFemale: false, filOther: false },
    experienceLevel: {
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    },
  });
  const [matchedUsers, setMatchedUsers] = useState<User[] | undefined>();
  const currentUser = useCurrentUser();
  const { data: users, isLoading: usersIsLoading } = useAllUsers();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const matches = getAllMatches(filter, currentUser, users);
    setMatchedUsers(matches);
    console.log(currentUser);
  }, [currentUser, users, filter]);

  const handleFilterChange = (value: string) => {
    const updatedFilter: Filter = filterChange(value, filter);
    setFilter(updatedFilter);
  };

  return (
    <Box>
      <Box>
        <Drawer anchor="top" variant="permanent">
          <NavBar currentUser={currentUser} />
        </Drawer>
      </Box>
      <Box sx={{ mt: 8 }}>
        <IconButton
          size="large"
          style={{ color: "white" }}
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <SideBar onChange={handleFilterChange} />
        </Drawer>
        {usersIsLoading ? (
          <ProgressIndicator xpos={50} ypos={50} />
        ) : (
          <ProfileDisplays users={matchedUsers} />
        )}
      </Box>
    </Box>
  );
}
