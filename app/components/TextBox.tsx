"use client";
import React, { useState } from "react";

interface TextBoxProps {
  placeholder: string;
}

const TextBox = ({ placeholder }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-32 md:w-auto"
      />
    </div>
  );
};

export default TextBox;
