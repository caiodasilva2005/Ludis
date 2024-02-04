"use client";
import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";

interface ButtonProps {
  page: string;
  buttonText: string;
  type: string;
}
const CustomButton: React.FC<ButtonProps> = ({ page, buttonText, type }) => {
  const buttonClass = "btn btn-" + type;

  return (
    <a role="button" className={buttonClass} href={page}>
      {buttonText}
    </a>
  );
};

export default CustomButton;
