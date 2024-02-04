import React from "react";

const CreateAccountPage = () => {

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
                  <div className="skeleton w-48 h-52 ml-16 mt-4 rounded-lg"></div>
                </li>
                <li className="ml-16 py-2">
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-xs file-input-info w-48 max-w-xs"
                  />
                </li>
                <li className="ml-16 py-2">
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Bio"
                  ></textarea>
                </li>
              </ul>
            </div>
            <div className="flex-col px-12 py-2 mt-8">
              <div className="flex px-2">
                <ul className="px-2">
                  <details className="dropdown">
                    <summary className="m-1 btn">Gender: {}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <a>Male</a>
                      </li>
                      <li>
                        <a>Female</a>
                      </li>
                      <li>
                        <a>Other</a>
                      </li>
                    </ul>
                  </details>
                </ul>
                <div className="flex border border-slate-400-900 w-48 h-12 rounded items-center justify-center shadow mt-1">
                  response
                </div>
              </div>
              <ul>
                <div className="flex px-2">
                  <details className="dropdown">
                    <summary className="m-1 btn">Experience: {}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <a>Beginner</a>
                      </li>
                      <li>
                        <a>Intermediate</a>
                      </li>
                      <li>
                        <a>Advanced</a>
                      </li>
                    </ul>
                  </details>
                  <div className="flex border border-slate-400-900 w-48 h-12 rounded items-center justify-center shadow mt-1">
                    response
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
