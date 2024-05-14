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
import { User } from "@/app/shared/src/types/users.types";

const ProfileDisplay = ({ user }: { user: User }) => {
  const pushInfo = () => {
    sessionStorage.setItem("ProfileToView", user.userId.toString());
  };

  const handleChat = () => {
    sessionStorage.setItem("ProfileToView", user.userId.toString());
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.personalInfo.image} />}
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
        title={`${user.personalInfo.firstName} ${user.personalInfo.lastName}`}
        subheader={user.accountInfo.username}
      />
      <CardContent>
        <Stack spacing={2}>
          <InfoDisplay
            label="Age"
            info={user.personalInfo.age}
            fontColor="black"
          />
          <InfoDisplay
            label="Gender"
            info={user.personalInfo.gender}
            fontColor="black"
          />
          <InfoDisplay
            label="Experience"
            info={user.personalInfo.experienceLevel}
            fontColor="black"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileDisplay;
