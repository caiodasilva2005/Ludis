"use client";
import React from "react";
import Link from "next/link";

const CreateAccountButton = () => {
  return (
    <div>
      <button className="btn btn-info">
        <Link href="/users/CreateAccountPage">Create Account</Link>
      </button>
    </div>
  );
};

export default CreateAccountButton;
