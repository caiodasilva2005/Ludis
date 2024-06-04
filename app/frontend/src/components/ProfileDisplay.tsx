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
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ChatIcon from "@mui/icons-material/Chat";
import { User } from "@/app/shared/src/types/users.types";
import { routes } from "../utils/routes";
import { setMatchingUserId } from "../utils/users";
import Link from "next/link";
import { getAge } from "../utils/datetime";

interface ProfileDisplayProps {
  user: User;
  isFriended: boolean;
  handleAddFriend: (friendId: number) => void;
  handleRemoveFriend: (friendId: number) => void;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  user,
  isFriended,
  handleAddFriend,
  handleRemoveFriend,
}) => {
  const handleFriend = (friendId: number) => {
    if (!isFriended) {
      handleAddFriend(friendId);
    } else {
      handleRemoveFriend(friendId);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.personalInfo.image} />}
        action={
          <>
            <IconButton onClick={() => handleFriend(user.userId)}>
              {isFriended ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
            <Link href={routes.VIEW_PROFILE}>
              <IconButton
                onClick={() => {
                  setMatchingUserId(user);
                }}
                href={routes.VIEW_PROFILE}
              >
                <PreviewIcon />
              </IconButton>
            </Link>
            <Link href={routes.CHAT}>
              <IconButton
                onClick={() => {
                  setMatchingUserId(user);
                }}
              >
                <ChatIcon />
              </IconButton>
            </Link>
          </>
        }
        title={`${user.personalInfo.firstName} ${user.personalInfo.lastName}`}
        subheader={user.accountInfo.username}
      />
      <CardContent>
        <Stack spacing={2}>
          <InfoDisplay
            label="Age"
            info={getAge(user.personalInfo.dateOfBirth).toString()}
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
