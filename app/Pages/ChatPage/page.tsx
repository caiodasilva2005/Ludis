"use client";
import React from "react";
import ReactDOM from "react-dom";
import FlutterEmbedComponent from "@/app/components/FlutterEmbed";
import CustomButton from "@/app/components/CustomButton";
import HomeButton from "@/app/components/HomeButton";

const page = () => {
  return (
    <div>
      <HomeButton />
      <FlutterEmbedComponent />
    </div>
  );
};

export default page;
