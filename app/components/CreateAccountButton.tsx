"use client";
import React from "react";
import Link from "next/link";

const CreateAccountButton = ({ onClick, username, password }) => {
  return (
    <div>
      <button
        className="btn btn-info"
        onClick={() => onClick(username, password)}
      >
        <Link href="users/CreateAccountPage">Create Account</Link>
      </button>
    </div>
  );
};

export default CreateAccountButton;
