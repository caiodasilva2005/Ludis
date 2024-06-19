import React, { RefObject, useEffect, useState } from "react";
import { User } from "@/app/shared/src/types/users.types";

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
  const [triggerRebuild, setTriggerRebuild] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTriggerRebuild(true);
    }, 1500);

    return () => clearTimeout(timeoutId); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    if (triggerRebuild && iframeRef.current) {
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
  }, [triggerRebuild, currentUser, matchingUser, iframeRef]);

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
