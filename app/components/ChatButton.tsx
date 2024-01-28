"use client";
import React from "react";
import Link from "next/link";

const ChatButton = () => {
  return (
    <li className="py-2">
      <Link href="/users/ChatPage">Chats</Link>
    </li>
  );
};

export default ChatButton;
