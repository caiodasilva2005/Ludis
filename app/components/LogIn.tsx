"use client";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { supabase } from "../utils/supabase";
import { Profile, profileTable } from "../Types/types";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleCreateAccount = async (username: string, password: string) => {
    console.log("Username:", username);
    console.log("Password:", password);
    const newProf: Profile = {
      username: username,
      password: password,
      gender: "",
      experience_level: "",
    };

    try {
      const { data, error } = await supabase
        .from(profileTable)
        .insert([newProf])
        .select();

      if (error) {
        console.error("Error inserting row:", error.message, error.details);
        return;
      }
      const profileId = data[0].id;
      console.log(profileId);
      sessionStorage.setItem("ProfileID", profileId);
      console.log("Inserted Row:", data);
    } catch (error) {
      console.error("Error inserting row:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase
        .from(profileTable)
        .select()
        .eq("username", username);
      if (error) {
        throw error;
      }
      if (data !== null && data[0].password === password) {
        const profileId = data[0].id;
        console.log("found:", profileId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="box-content bg-white sm:w-3/5 h-96 rounded p-4 shadow-lg">
        <div className="border-2 border-gray-300 w-108 h-96 rounded shadow-sm flex items-center justify-center">
          <ul>
            <li>
              <h1 className="font-bold py-4 ml-24 mb-4">LOG IN</h1>
            </li>
            <li>
              <div className="py-2">
                <input
                  type="text"
                  className="input input-bordered w-32 md:w-auto"
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="Username"
                />
              </div>
            </li>
            <li>
              <input
                type="text"
                className="input input-bordered w-32 md:w-auto"
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Password"
              />
            </li>
            <li>
              <div className="p-4 ml-8 mt-4">
                <CustomButton
                  type="info"
                  buttonText="Create Account"
                  handleClick={async () =>
                    handleCreateAccount(username, password)
                  }
                  page="../Pages/CreateAccountPage"
                />
              </div>
              <div>
                <CustomButton
                  type="info"
                  buttonText="Sign In"
                  handleClick={async () => handleSignIn()}
                  page="../"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
