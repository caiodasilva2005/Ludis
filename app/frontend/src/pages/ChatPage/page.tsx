"use client";
import React, { useRef } from "react";
import FlutterEmbedComponent from "./components/FlutterEmbed";
import HomeButton from "@/app/frontend/src/components/HomeButton";
import { useCurrentUser, useSingleUser } from "../../hooks/users.hooks";
import { getMatchingUserId } from "../../utils/users";
import ProgressIndicator from "../../components/ProgressIndicator";

const ChatPage = () => {
  const currentUser = useCurrentUser();
  const matchingUserId = getMatchingUserId();
  const { data: matchingUser, isLoading: matchingUserIsLoading } =
    useSingleUser(parseInt(matchingUserId!));
  const iframeRef = useRef<HTMLIFrameElement>(null);
  console.log(iframeRef);

  if (matchingUserIsLoading || !currentUser || !matchingUser)
    return <ProgressIndicator xpos={50} ypos={50} />;
  return (
    <>
      <HomeButton />
      <FlutterEmbedComponent
        currentUser={currentUser}
        matchingUser={matchingUser}
        iframeRef={iframeRef}
      />
    </>
  );
};

export default ChatPage;
