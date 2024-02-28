"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { supabase } from "../utils/supabase";
import { imageBucket, profileTable } from "../Types/types";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const CreateAccountScreen = () => {
  const [profileId, setProfileId] = useState<number>();

  const [gender, setGender] = useState("male");
  const [experience_level, setExperienceLevel] = useState("beginner");
  const [file, setFile] = useState<File>();
  const [img, setImg] = useState<string | undefined>("");
  const [bio, setBio] = useState("");

  const updateAccount = async () => {
    try {
      const { error } = await supabase
        .from(profileTable)
        .update({
          gender: gender,
          experience_level: experience_level,
          image: img,
        })
        .eq("id", profileId);
      if (error) {
        console.log(error.message);
        console.log("Hey");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const getURL = async (File: File | undefined) => {
    const filename = await uploadImage(File);
    console.log(filename);
    console.log();
    if (filename) {
      const { data } = supabase.storage
        .from(imageBucket)
        .getPublicUrl(`${filename}`);

      console.log(data.publicUrl);
      return data.publicUrl;
    }
    return "";
  };

  const uploadImage = async (newFile: File | undefined) => {
    try {
      if (newFile !== undefined) {
        const filename = `${uuidv4()}-${newFile.name}`;
        const { data, error } = await supabase.storage
          .from(imageBucket)
          .upload(filename, newFile);
        if (error) {
          console.log("ERROR:", error.message);
        }
        return filename;
      } else {
        console.log("no file");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = Number(sessionStorage.getItem("ProfileID")!);
    console.log("ID:", id);
    setProfileId(id);
    console.log(profileId);
  }, [profileId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="box-content bg-white sm:w-3/5 sm:h-4/5 rounded p-4 shadow-lg">
        <div className="border-2 border-gray-300 w-108 h-full rounded shadow-sm">
          <div className="flex justify-center">
            <h1 className="font-bold mt-4">ACCOUNT INFO</h1>
          </div>
          <div className="flex items-center">
            <div className="flex-col ml-4">
              <ul>
                <li className="py-2">
                  <div className="w-48 h-52 rounded-lg">
                    {img === "" ? (
                      <div className="skeleton w-48 h-52 ml-16 mt-4 rounded-lg"></div>
                    ) : (
                      <div className="h-52 ml-16 mt-4 rounded-lg">
                        <Image
                          src={img}
                          alt="prof pic"
                          width="480"
                          height="520"
                        />
                      </div>
                    )}
                  </div>
                </li>
                <li className="ml-16 py-2">
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-xs file-input-info w-48 max-w-xs"
                    onChange={async (event) => {
                      setFile(event.target.files?.[0]);
                      console.log("File:", file);
                      if (file) {
                        const url = await getURL(file);
                        setImg(url);
                        console.log("Image:", img);
                      }
                    }}
                  />
                </li>
                <li className="ml-16 py-2">
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Bio"
                    onChange={(event) => {
                      setBio(event.target.value);
                    }}
                  ></textarea>
                </li>
              </ul>
            </div>
            <div className="flex-col px-12 py-2 mt-8">
              <div className="flex px-2">
                <ul className="px-2">
                  <details className="dropdown">
                    <summary className="m-1 btn">{gender}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <a
                          className={`${
                            gender === "male" ? "bg-green-600" : "bg-white"
                          }`}
                          onClick={() => setGender("male")}
                        >
                          Male
                        </a>
                      </li>
                      <li>
                        <a
                          className={`${
                            gender === "female" ? "bg-green-600" : "bg-white"
                          }`}
                          onClick={() => setGender("female")}
                        >
                          Female
                        </a>
                      </li>
                      <li>
                        <a
                          className={`${
                            gender === "other" ? "bg-green-600" : "bg-white"
                          }`}
                          onClick={() => setGender("other")}
                        >
                          Other
                        </a>
                      </li>
                    </ul>
                  </details>
                </ul>
              </div>
              <ul>
                <div className="flex px-2">
                  <details className="dropdown">
                    <summary className="m-1 btn">{experience_level}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <a
                          className={`${
                            experience_level === "beginner"
                              ? "bg-green-600"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            setExperienceLevel("beginner");
                          }}
                        >
                          Beginner
                        </a>
                      </li>
                      <li>
                        <a
                          className={`${
                            experience_level === "intermediate"
                              ? "bg-green-600"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            setExperienceLevel("intermediate");
                          }}
                        >
                          Intermediate
                        </a>
                      </li>
                      <li>
                        <a
                          className={`${
                            experience_level === "advanced"
                              ? "bg-green-600"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            setExperienceLevel("advanced");
                          }}
                        >
                          Advanced
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </ul>
            </div>
          </div>
          <div className="flex justify-center p-4">
            <CustomButton
              type="info"
              buttonText="Submit"
              handleClick={async () => updateAccount()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountScreen;
