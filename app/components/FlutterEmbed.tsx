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
import { supabase } from "../utils/supabase";
import { Profile, profileTable } from "../Types/types";

const FlutterEmbedComponent: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentUserId, setCurrentUserId] = useState<number>();
  const [currentUser, setCurrentUser] = useState<Profile>();

  useEffect(() => {
    const storedId = sessionStorage.getItem("CurrentUser");
    setCurrentUserId(Number(storedId));
  }, []);

  useEffect(() => {
    const getCurrentProf = async () => {
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
    if (iframeRef.current) {
      const storedUsername = currentUser?.username;
      const storedPassword = currentUser?.password;

      const iframeWindow = iframeRef.current.contentWindow;
      const message = { username: storedUsername, password: storedPassword };

      if (iframeWindow) {
        iframeWindow.postMessage(message, "*");
      }
    }
  }, [currentUser]);

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

export default FlutterEmbedComponent;
