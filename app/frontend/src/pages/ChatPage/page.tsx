import React from "react";
import FlutterEmbedComponent from "@/app/frontend/src/components/FlutterEmbed";
import HomeButton from "@/app/frontend/src/components/HomeButton";

const page = () => {
  return (
    <div>
      <HomeButton />
      <FlutterEmbedComponent />
    </div>
  );
};

export default page;
