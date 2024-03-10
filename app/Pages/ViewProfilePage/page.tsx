"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const ViewProfilePage = () => {
  const [profileId, setProfileId] = useState<number>(-1);

  useEffect(() => {
    const storedProfileId = sessionStorage.getItem("ProfileToView");
    if (storedProfileId) {
      setProfileId(Number(storedProfileId));
      console.log("Here");
    }
    console.log("In profile view: ", storedProfileId);
    console.log(profileId);
  }, []);

  return (
    <Box>
      <Typography>View Profile</Typography>
    </Box>
  );
};

export default ViewProfilePage;
