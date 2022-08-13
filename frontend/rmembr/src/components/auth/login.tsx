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
    delay: 0.2,
    duration: 1.2,
    ease: "easeOut",
  },
};

const OutAnimation = {
  key: "sign-up",
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
      delay: 0.4,
      duration: 1.2,
    },
  },
  transition: {
    delay: 1.5,
    duration: 1.2,
    ease: "easeOut",
  },
};

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
            <motion.div {...InAnimation}>
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
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-asterisk"
                        viewBox="0 0 16 16"
                        className="text-gray-400"
                      >
                        <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    No account?&nbsp;
                    <button
                      type="button"
                      className="underline"
                      onClick={toggleClick}
                    >
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
            <motion.div {...OutAnimation}>
              <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only font-montserrat">
                    Name
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      className="w-full p-4 pr-12 text-sm border-2 focus:outline-none border-gray-600 rounded-lg bg-transparent text-white font-montserrat"
                      placeholder="Enter Name"
                    />

                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                        className="w-5 h-5 text-gray-400"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
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
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400"
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
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-asterisk"
                        viewBox="0 0 16 16"
                        className="text-gray-400"
                      >
                        <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-block px-5 py-3 text-sm font-medium text-gray-500 bg-gray-800 rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
