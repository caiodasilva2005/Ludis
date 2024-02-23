"use client";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  page?: string;
  buttonText: string;
  type: string;
  handleClick?: MouseEventHandler<HTMLAnchorElement>;
}

const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const buttonClass = "btn btn-" + props.type;

  if (props.handleClick && props.page) {
    return (
      <a
        role="button"
        className={buttonClass}
        href={props.page}
        onClick={props.handleClick}
      >
        {props.buttonText}
      </a>
    );
  } else if (props.page) {
    return (
      <a role="button" className={buttonClass} href={props.page}>
        {props.buttonText}
      </a>
    );
  } else {
    return (
      <a role="button" className={buttonClass} onClick={props.handleClick}>
        {props.buttonText}
      </a>
    );
  }
};

export default CustomButton;
