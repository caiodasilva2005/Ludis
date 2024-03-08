import React from "react";
import { Box, Typography } from "@mui/material";

const InfoDisplay = ({ label, info }) => {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
        }}
      >
        {label}:
      </Typography>
      <Typography variant="body1">{info}</Typography>
    </Box>
  );
};

export default InfoDisplay;
