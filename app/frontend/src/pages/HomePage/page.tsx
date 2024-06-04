"use client";
import { useEffect, useState } from "react";
import {
  useAddFriend,
  useAllUsers,
  useCurrentUser,
  useFriends,
  useRemoveFriend,
} from "../../hooks/users.hooks";
import { getAllMatches } from "../../utils/users";
import { filterChange } from "../../utils/filters";
import { Box } from "@mui/material";
import NavBar from "../../components/NavBar";
import { Filter } from "@/app/shared/src/types/filters.types";
import { User } from "@/app/shared/src/types/users.types";
import ProfileDisplays from "./components/ProfileDisplays";
import FilterBar from "./components/FilterBar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>({
    gender: { filMale: false, filFemale: false, filOther: false },
    experienceLevel: {
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    },
  });
  const [matchedUsers, setMatchedUsers] = useState<User[] | undefined>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();
  const currentUser = useCurrentUser();
  const { data: users, isLoading: usersIsLoading } = useAllUsers();
  const { data: friendUserIds, isLoading: friendsIsLoading } = useFriends(
    currentUser?.userId!
  );
  const { mutateAsync: addFriend } = useAddFriend(currentUser?.userId!);
  const { mutateAsync: removeFriend } = useRemoveFriend(currentUser?.userId!);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const matches = getAllMatches(filter, currentUser, users);
    setMatchedUsers(matches);
  }, [currentUser, users, filter]);

  const handleFilterChange = (value: string) => {
    const updatedFilter: Filter = filterChange(value, filter);
    setFilter(updatedFilter);
  };

  const handleAddFriend = async (friendId: number) => {
    const updatedFriends = await addFriend(friendId);
    return updatedFriends;
  };

  const handleRemoveFriend = async (friendId: number) => {
    console.log("REMOVE");
    const updatedFriends = await removeFriend(friendId);
    return updatedFriends;
  };

  return (
    <Box>
      <NavBar
        currentUser={currentUser}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        router={router}
      />
      <FilterBar
        setDrawerOpen={setIsDrawerOpen}
        drawerOpen={isDrawerOpen}
        handleFilterChange={handleFilterChange}
        filter={filter}
      />
      <Box sx={{ mt: 8 }}>
        <ProfileDisplays
          users={matchedUsers}
          usersIsLoading={usersIsLoading}
          friendUserIds={friendUserIds}
          friendsIsLoading={friendsIsLoading}
          handleAddFriend={handleAddFriend}
          handleRemoveFriend={handleRemoveFriend}
        />
      </Box>
    </Box>
  );
}
