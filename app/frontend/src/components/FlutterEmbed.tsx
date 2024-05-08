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
import { Profile, profileTable } from "../../../shared/src/types/users.types";

const FlutterEmbedComponent: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentUserId, setCurrentUserId] = useState<number>();
  const [viewProfileId, setViewProfileId] = useState<number>();
  const [currentUser, setCurrentUser] = useState<Profile>();
  const [viewProfile, setViewProfile] = useState<Profile>();

  useEffect(() => {
    const storedId = sessionStorage.getItem("CurrentUser");
    const viewProfileId = sessionStorage.getItem("ProfileToView");
    console.log(storedId);
    console.log(viewProfileId);
    console.log("running?");
    setCurrentUserId(Number(storedId));
    setViewProfileId(Number(viewProfileId));
  }, []);

  useEffect(() => {
    const getCurrentProf = async () => {
      console.log(currentUserId);
      const { data, error } = await supabase
        .from(profileTable)
        .select()
        .eq("id", currentUserId);
      if (error) {
        console.log(`${error.code}: ${error.message}`);
        return;
      }
      setCurrentUser(data[0]);
    };

    getCurrentProf();
  }, [currentUserId]);

  useEffect(() => {
    const getOtherProf = async () => {
      console.log(viewProfileId);
      const { data, error } = await supabase
        .from(profileTable)
        .select()
        .eq("id", viewProfileId);
      if (error) {
        console.log(`${error.code}: ${error.message}`);
        return;
      }
      setViewProfile(data[0]);
    };

    getOtherProf();
  }, [viewProfileId]);

  useEffect(() => {
    if (iframeRef.current) {
      const storedUsername = currentUser?.username;
      console.log(storedUsername);
      const storedPassword = currentUser?.password;
      console.log(storedPassword);
      const storedEmail = currentUser?.email;
      const otherUser = viewProfile?.username;
      console.log(otherUser);

      const iframeWindow = iframeRef.current.contentWindow;
      const message = {
        username: storedUsername,
        password: storedPassword,
        email: storedEmail,
        otherUser: otherUser,
      };

      if (iframeWindow) {
        console.log(message);
        iframeWindow.postMessage(message, "*");
      }
    }
  }, [currentUser, viewProfile]);

  return (
    <iframe
      ref={iframeRef}
      src="/web/index.html" // Adjust the path as necessary
      title="Flutter App"
      width="100%"
      height="620px"
      style={{ border: "none" }}
    ></iframe>
  );
};

export default FlutterEmbedComponent;
