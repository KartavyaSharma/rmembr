import * as React from "react";

export default function indexPage() {
  return (
    <div className="h-screen w-full bg-black">
      <div className="px-8 py-32">
        <div className="grid grid-rows-1 justify-items-stretch">
          <div className="font-montserrat text-9xl font-semibold text-white p-5 justify-self-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 ">
            {" "}
            rmembr{" "}
          </div>
        </div>
        <div className="grid grid-rows-1 justify-items-stretch">
          <div className="font-montserrat text-3xl font-light text-gray-500 p-3 pb-5 align-middle justify-self-center justify-center w-1/2">
            <div className="flex w-full justify-center">Coming soon</div>
          </div>
        </div>
        <div className="grid grid-rows-1 justify-items-stretch">
          <div className="font-montserrat text-md font-light text-gray-500 p-3 pb-5 align-middle justify-self-center justify-center w-1/2">
            <div className="flex w-full justify-center text-center">
              rmembr is an academic scheduler designed to simplify your
              coursework planning process. With rmembr you can keep track of
              your active recall progress, plan office hours, and record
              practice questions. All in one place.
            </div>
          </div>
        </div>
        <div className="grid grid-rows-1 justify-items-stretch">
          <div className="font-montserrat text-md font-light text-gray-500 p-3 pb-5 align-middle justify-self-center justify-center w-1/2 mt-5 border-t-2 border-gray-500">
            <div className="flex flex-row w-full">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
