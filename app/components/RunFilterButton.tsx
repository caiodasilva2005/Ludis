"use client";
import React from "react";
import Link from "next/link";

const RunFilterButton = ({ onClick, gender, experienceLevel }) => {
  return (
    <div>
      <button
        className="btn btn-info"
        onClick={() => onClick(geneder, experienceLevel)}
      >
        <Link href="users/CreateAccountPage">Run Filter</Link>
      </button>
    </div>
  );
};

export default RunFilterButton;
