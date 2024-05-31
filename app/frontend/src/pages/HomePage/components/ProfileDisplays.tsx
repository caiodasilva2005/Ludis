import React from "react";
import ProfileDisplay from "../../../components/ProfileDisplay";
import { User } from "../../../../../shared/src/types/users.types";
import { Container, Grid } from "@mui/material";
import ProgressIndicator from "../../../components/ProgressIndicator";

interface ProfileDisplaysProps {
  users?: User[];
  usersIsLoading: boolean;
}

const ProfileDisplays: React.FC<ProfileDisplaysProps> = ({
  users,
  usersIsLoading,
}) => {
  if (usersIsLoading || !users)
    return <ProgressIndicator xpos={50} ypos={50} />;
  return (
    <Container sx={{ overflowY: "auto" }}>
      <Grid container spacing={3}>
        {users &&
          users.map((user: User) => (
            <Grid key={user.userId} item xs={12} md={6} lg={4}>
              <ProfileDisplay key={user.userId} user={user} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProfileDisplays;
