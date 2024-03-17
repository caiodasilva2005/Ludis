import React from "react";
import ReactDOM from "react-dom";
import FlutterEmbedComponent from "@/app/components/FlutterEmbed";
import CustomButton from "@/app/components/CustomButton";

const page = () => {
  return (
    <div>
      <CustomButton
        buttonProps={{
          label: "Back",
          page: "/",
        }}
      />
      <FlutterEmbedComponent></FlutterEmbedComponent>
    </div>
  );
};

export default page;
