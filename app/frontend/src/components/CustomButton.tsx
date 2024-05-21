import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  page?: string;
  onClick?: Function;
  submitForm?: boolean;
}

/*TO-DO: Upate compoents to React.FC */
const CustomButton = ({ buttonProps }) => {
  return (
    <Button
      type={buttonProps.submitForm ?? "submit"}
      variant="contained"
      onClick={buttonProps.onClick}
      href={buttonProps.page}
      sx={{ borderRadius: "20px", bgcolor: "#7227a8" }}
    >
      {buttonProps.label}
    </Button>
  );
};

export default CustomButton;
