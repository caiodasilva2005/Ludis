"use client";
import ProfileDisplays from "./frontend/src/components/ProfileDisplays";
import SideBar from "./frontend/src/components/SideBar";
import { useEffect, useState } from "react";
import { profileTable, supabase } from "./shared/src/utils/supabase";
import { Box, CircularProgress, Drawer, IconButton } from "@mui/material";
import NavBar from "./frontend/src/components/NavBar";
import MenuIcon from "@mui/icons-material/Menu";
import { User } from "./shared/src/types/users.types";
import { Filter } from "./shared/src/types/filters.types";
import { useAllUsers, useCurrentUser } from "./frontend/src/hooks/users.hooks";
import { filterChange } from "./frontend/src/utils/filters";
import { getAllMatches } from "./frontend/src/utils/users";

export default function Home() {
  const currentUser = useCurrentUser();
  const { data: users, isLoading: usersIsLoading } = useAllUsers();
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<Filter>({
    gender: { filMale: false, filFemale: false, filOther: false },
    experienceLevel: {
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    },
  });

  const handleFilterChange = (value: string) => {
    const updatedFilter: Filter = filterChange(value, filter);
    setFilter(updatedFilter);
  };

  const handleRunFilter = async () => {
    if (!currentUser) throw Error(`No current user.`);
    if (!users) throw Error(`No users not found.`);
    const filteredUsers = getAllMatches(currentUser, filter, users);
    console.log(filteredUsers);
    setMatchedUsers(filteredUsers);
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
            setFilter({
              gender: { filMale: false, filFemale: false, filOther: false },
              experienceLevel: {
                filBeginner: false,
                filIntermediate: false,
                filAdvanced: false,
              },
            });
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
          <SideBar
            onChange={handleFilterChange}
            onRunFilter={handleRunFilter}
          />
        </Drawer>
        {usersIsLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <ProfileDisplays users={matchedUsers} />
        )}
      </Box>
    </Box>
  );
}
