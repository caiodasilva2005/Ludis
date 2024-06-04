import React from "react";
import ProfileDisplay from "../../../components/ProfileDisplay";
import { User } from "../../../../../shared/src/types/users.types";
import { Container, Grid } from "@mui/material";
import ProgressIndicator from "../../../components/ProgressIndicator";

interface ProfileDisplaysProps {
  users?: User[];
  friendUserIds?: number[];
  friendsIsLoading: boolean;
  usersIsLoading: boolean;
  handleAddFriend: (friendId: number) => void;
  handleRemoveFriend: (friendId: number) => void;
}

const ProfileDisplays: React.FC<ProfileDisplaysProps> = ({
  users,
  friendUserIds,
  friendsIsLoading,
  usersIsLoading,
  handleAddFriend,
  handleRemoveFriend,
}) => {
  if (usersIsLoading || friendsIsLoading || !users)
    return <ProgressIndicator xpos={50} ypos={50} />;
  return (
    <Container sx={{ overflowY: "auto" }}>
      <Grid container spacing={3}>
        {users &&
          users.map((user: User) => (
            <Grid key={user.userId} item xs={12} md={6} lg={4}>
              <ProfileDisplay
                key={user.userId}
                user={user}
                isFriended={
                  friendUserIds ? friendUserIds.includes(user.userId) : false
                }
                handleAddFriend={handleAddFriend}
                handleRemoveFriend={handleRemoveFriend}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProfileDisplays;
