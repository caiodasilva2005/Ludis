import React from "react";
import TextBox from "./TextBox";
import CustomButton from "./CustomButton";

const LogIn = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="box-content bg-white sm:w-3/5 h-96 rounded p-4 shadow-lg">
        <div className="border-2 border-gray-300 w-108 h-96 rounded shadow-sm flex items-center justify-center">
          <ul>
            <li>
              <h1 className="font-bold py-4 ml-24 mb-4">LUDIS</h1>
            </li>
            <li>
              <div className="py-2">
                <TextBox placeholder={"Username"} />
              </div>
            </li>
            <li>
              <div className="py-2">
                <TextBox placeholder={"Password"} />
              </div>
            </li>
            <li>
              <div className="p-4 ml-8 mt-4">
                <CustomButton
                  label="Create Account"
                  page="/users/CreateAccountPage"
                  btnType="info"
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
