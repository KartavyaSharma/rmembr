import React, { useState, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InAnimation = {
    key: "sign-in",
    initial: {
        y: "30%",
        opacity: 0,
        scale: 0.5,
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
    },
    exit: {
        x: "-50%",
        opacity: 0,
        transition: {
            duration: 1.2,
        },
    },
    transition: {
		delay: 0.9,
        duration: 1.2,
        ease: "easeOut",
    },
}

const OutAnimation = {
	
}

export default function Login(): ReactElement {
  const [isShown, setIsShown] = useState(true);

  const toggleClick = () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-montserrat font-bold sm:text-3xl text-gray-600">
            Get started today!
          </h1>

          <p className="mt-4 font-montserrat text-md lg:text-lg font-medium text-gray-600 w-full">
            rmembr is an academic scheduler designed to simplify your coursework
            planning process. With rmembr you can keep track of your active
            recall progress, plan office hours, and record practice questions.
            All in one place.
          </p>
        </div>
        <AnimatePresence>
          {isShown ? (
            <motion.div {...InAnimation} >
              <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only font-montserrat">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      className="w-full p-4 pr-12 text-sm border-2 focus:outline-none border-gray-600 rounded-lg bg-transparent text-white font-montserrat"
                      placeholder="Enter email"
                    />

                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full p-4 pr-12 text-sm border-2 focus:outline-none border-gray-600 rounded-lg bg-transparent text-white font-montserrat"
                      placeholder="Enter password"
                    />

                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    No account?&nbsp;
                    <button type="button" className="underline" onClick={toggleClick}>
                      Sign up
                    </button>
                  </p>

                  <button
				  	type="button"
                    className="inline-block px-5 py-3 ml-3 text-sm font-medium text-gray-500 bg-gray-800 rounded-lg"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
			<>
			</>
		  )}
        </AnimatePresence>
      </div>
    </div>
  );
}
