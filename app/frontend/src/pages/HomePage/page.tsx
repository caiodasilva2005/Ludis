"use client";
import { useEffect, useState } from "react";
import { useAllUsers, useCurrentUser } from "../../hooks/users.hooks";
import { getAllMatches } from "../../utils/users";
import { filterChange } from "../../utils/filters";
import { Box } from "@mui/material";
import NavBar from "../../components/NavBar";
import { Filter } from "@/app/shared/src/types/filters.types";
import { User } from "@/app/shared/src/types/users.types";
import ProfileDisplays from "./components/ProfileDisplays";
import FilterBar from "./components/FilterBar";

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
      <NavBar currentUser={currentUser} />
      <Box sx={{ mt: 8 }}>
        <FilterBar
          setDrawerOpen={setIsDrawerOpen}
          drawerOpen={isDrawerOpen}
          handleFilterChange={handleFilterChange}
          filter={filter}
        />
        <ProfileDisplays users={matchedUsers} usersIsLoading={usersIsLoading} />
      </Box>
    </Box>
  );
}
