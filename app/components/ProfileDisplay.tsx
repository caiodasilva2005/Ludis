import React from "react";
import {
  Stack,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Avatar,
} from "@mui/material";
import InfoDisplay from "./InfoDisplay";
import PreviewIcon from "@mui/icons-material/Preview";
import ChatIcon from "@mui/icons-material/Chat";

const ProfileDisplay = ({ profile }) => {
  const pushInfo = () => {
    sessionStorage.setItem("ProfileToView", profile.id);
    console.log("Push:", profile.id);
  };

  const handleChat = () => {
    sessionStorage.setItem("ProfileToView", profile.id);
    console.log("handle Chat");
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={profile.image} />}
        action={
          <>
            <IconButton onClick={pushInfo} href="/Pages/ViewProfilePage">
              <PreviewIcon />
            </IconButton>
            <IconButton onClick={handleChat} href="/Pages/ChatPage">
              <ChatIcon />
            </IconButton>
          </>
        }
        title={profile.first_name + " " + profile.last_name}
        subheader={profile.username}
      />
      <CardContent>
        <Stack spacing={2}>
          <InfoDisplay label="Age" info={profile.age} fontColor="black" />
          <InfoDisplay label="Gender" info={profile.gender} fontColor="black" />
          <InfoDisplay
            label="Experience"
            info={profile.experience_level}
            fontColor="black"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileDisplay;
