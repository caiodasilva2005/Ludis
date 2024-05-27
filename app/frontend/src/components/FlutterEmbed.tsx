/*"use client";
import React, { useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FlutterEmbedComponent: React.FC = () => {
  const { username, password } = useAuth();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow;
      const message = { username, password };

      if (iframeWindow) {
        iframeWindow.postMessage(message, "*");
      }
    }
  }, [username, password]);

  return (
    <iframe
      ref={iframeRef}
      src="/web/index.html" // Adjust the path as necessary
      title="Flutter App"
      width="100%"
      height="500px"
      style={{ border: "none" }}
    ></iframe>
  );
};

export default FlutterEmbedComponent;*/
"use client";
import React, { useRef, useEffect, useState } from "react";
import { supabase } from "../../../shared/src/utils/supabase";
import { profileTable } from "../../../shared/src/utils/supabase";
import { User } from "@/app/shared/src/types/users.types";
import { useCurrentUser, useSingleUser } from "../hooks/users.hooks";
import { getMatchingUserId } from "../utils/users";

const FlutterEmbedComponent: React.FC = () => {
  const currentUser = useCurrentUser();
  const matchingUserId = getMatchingUserId();
  const { data: matchingUser, isLoading: matchingUserIsLoading } =
    useSingleUser(parseInt(matchingUserId!));
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
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
  }, [currentUser, matchingUser]);

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
