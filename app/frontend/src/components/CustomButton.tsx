import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  page?: string;
  onClick?: Function;
  submitForm?: boolean;
}

/*TO-DO: Upate compoents to React.FC */
const CustomButton: React.FC<ButtonProps> = ({
  label,
  page,
  onClick,
  submitForm,
}) => {
  return (
    <Button
      type={submitForm ? "submit" : undefined}
      variant="contained"
      onClick={onClick}
      href={page}
      sx={{ borderRadius: "20px", bgcolor: "#7227a8" }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
