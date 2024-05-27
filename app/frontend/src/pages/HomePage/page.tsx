"use client";
import { useEffect, useState } from "react";
import { useAllUsers, useCurrentUser } from "../../hooks/users.hooks";
import { getAllMatches } from "../../utils/users";
import { filterChange } from "../../utils/filters";
import { Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavBar from "../../components/NavBar";
import { Filter } from "@/app/shared/src/types/filters.types";
import { User } from "@/app/shared/src/types/users.types";
import SideBar from "../../components/SideBar";
import ProgressIndicator from "../../components/ProgressIndicator";
import ProfileDisplays from "../../components/ProfileDisplays";

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
