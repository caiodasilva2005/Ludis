import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadFileButton = ({ onImgFile, onChange }) => {
  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      sx={{ borderRadius: "20px", bgcolor: "#7227a8" }}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        onChange={async (e) => {
          const imageUrl = await onImgFile(e.target.files![0]);
          onChange(imageUrl);
        }}
      />
    </Button>
  );
};

export default UploadFileButton;
