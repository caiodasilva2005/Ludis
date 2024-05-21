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
import { routes } from "../utils/routes";
import { setMatchingUser } from "../utils/users";

const ProfileDisplay = ({ user }: { user: User }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.personalInfo.image} />}
        action={
          <>
            <IconButton
              onClick={() => {
                setMatchingUser(user);
              }}
              href={routes.VIEW_PROFILE}
            >
              <PreviewIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setMatchingUser(user);
              }}
              href={routes.CHAT}
            >
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
