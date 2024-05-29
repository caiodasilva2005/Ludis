"use client";
import React, { useRef, useEffect, useState, RefObject } from "react";
import { supabase } from "../../../../../shared/src/utils/supabase";
import { profileTable } from "../../../../../shared/src/utils/supabase";
import { User } from "@/app/shared/src/types/users.types";
import { useCurrentUser, useSingleUser } from "../../../hooks/users.hooks";
import { getMatchingUserId } from "../../../utils/users";

interface FlutterEmbedComponentProps {
  currentUser: User;
  matchingUser: User;
  iframeRef: RefObject<HTMLIFrameElement>;
}

const FlutterEmbedComponent: React.FC<FlutterEmbedComponentProps> = ({
  currentUser,
  matchingUser,
  iframeRef,
}) => {
  if (iframeRef.current) {
    const iframeWindow = iframeRef.current.contentWindow;
    const message = {
      username: currentUser?.accountInfo.username,
      password: currentUser?.accountInfo.password,
      email: currentUser?.accountInfo.email,
      otherUser: matchingUser?.accountInfo.username,
    };

    if (iframeWindow) {
      iframeWindow.postMessage(message, "*");
    }
  }
  return (
    <iframe
      ref={iframeRef}
      src="/web/index.html" // Adjust the path as necessary
      title="Flutter App"
      width="100%"
      height="620px"
      style={{ border: "none" }}
    />
  );
};

export default FlutterEmbedComponent;
