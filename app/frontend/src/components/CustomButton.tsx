import React from "react";
import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  page?: string;
  onClick?: () => void;
  submitForm?: boolean;
  disabled?: boolean; // Added disabled prop
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  page,
  onClick,
  submitForm,
  disabled, // Destructure disabled prop
}) => {
  return (
    <Button
      type={submitForm ? "submit" : undefined}
      variant="contained"
      onClick={onClick}
      href={page}
      disabled={disabled} // Pass disabled prop to Button
      sx={{ borderRadius: "20px", bgcolor: "#7227a8" }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
