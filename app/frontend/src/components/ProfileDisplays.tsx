import React from "react";
import ProfileDisplay from "./ProfileDisplay";
import { User } from "../../../shared/src/types/users.types";
import { Box, Stack, Container, Grid } from "@mui/material";

const ProfileDisplays = ({ users }: { users: User[] }) => {
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
