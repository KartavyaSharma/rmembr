import * as React from "react";
import { Helmet } from "react-helmet";

export default function indexPage() {
  const content =
    '<div class="stack" style="--stacks: 3;"><span style="--index: 0;">rmembr</span><span style="--index: 1;">rmembr</span style="--index: 2;"><span>rmembr</span></div>';

  return (
    <section>
      <Helmet
        htmlAttributes={{"lang": "en"}}
        title="rmembr - academic scheduler"
        meta={[
          {"name": "description", "content": "rmembr - academic scheduler"},
          {"name": "title", "content": "rmembr - academic scheduler"},
          {"property": "keywords", "content": "rmembr, academic scheduler, active recall, office hours"},
          {"property": "author", "content": "Kartavya Sharma"},
          {"property": "og:title", "content": "rmembr - academic scheduler"},
          {"property": "og:description", "content": "rmembr - academic scheduler"},
          {"property": "og:image", "content": "../images/bookmark-check-fill-white.png"},
          {"property": "og:url", "content": "https://rmembr.kartavyas.com"},
          {"property": "og:type", "content": "website"},
        ]}
      >
        <link rel="icon" type="image/png" href="src/images/bookmark-check-fill-white.png" sizes="16x16" />
      </Helmet>
      <div className="h-screen w-full bg-cover bg-fixed bg-black">
        <div className="px-8 py-32 w-full h-full">
          <div className="grid justify-items-middle min-h-full">
            <div className="grid grid-rows-1 justify-items-stretch relative">
              <div
                className="p-5 justify-self-center absolute object-center font-montserrat font-semibold"
                data-sal="zoom-in"
                data-sal-easing="ease"
                data-sal-duration="1500"
                id="hideMe"
              >
                <div id="glitch" data-name="rmembr">
                  {" "}
                  <span className="scale-100">
                    {" "}
                    rmembr{" "}
                  </span>{" "}
                </div>
              </div>
              <div
                className="p-5 justify-self-center text-white absolut object-center"
                data-sal="zoom-in"
                data-sal-easing="ease"
                data-sal-duration="1500"
                id="showMe"
              >
                <span className="font-montserrat font-semibold scale-100">
                  <div
                    style={{ fontSize: "10vmin" }}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </span>
              </div>
            </div>

            <div className="grid grid-rows-1 justify-items-stretch">
              <div className="font-montserrat text-xl lg:text-3xl xl:5xl font-bold text-neutral-600 p-5 align-middle justify-self-center justify-center w-full lg:w-1/2">
                <div
                  className="grid grid-rows-1 w-full justify-items-center h-full content-center"
                  data-sal="fade"
                  data-sal-easing="ease"
                  data-sal-duration="2000"
                >
                  Coming soon
                </div>
              </div>
            </div>
            <div className="grid grid-rows-1 justify-items-stretch">
              <div className="font-montserrat text-md lg:text-lg 2xl:text-xl font-light text-neutral-600 p-3 pb-5 align-middle justify-self-center justify-center w-full lg:w-1/2">
                <div
                  className="flex w-full justify-center text-center"
                  data-sal="slide-up"
                  data-sal-easing="ease"
                  data-sal-duration="2000"
                >
                  rmembr is an academic scheduler designed to simplify your
                  coursework planning process. With rmembr you can keep track of
                  your active recall progress, plan office hours, and record
                  practice questions. All in one place.
                </div>
              </div>
            </div>
            <div className="flex w-full my-5 justify-center">
              <div
                className="flex w-full justify-center text-center"
                data-sal="zoom-out"
                data-sal-easing="ease"
                data-sal-duration="2000"
              >
                <a
                  className="relative inline-flex items-center px-8 py-2 2xl:py-3 overflow-hidden text-neutral-600 border-2 border-current rounded group active:text-neutral-500 focus:outline-none focus:none"
                  href="https://github.com/KartavyaSharma/rmembr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  <span className="font-montserrat text-md font-medium transition-all group-hover:mr-4">
                    view source code
                  </span>
                </a>
              </div>
            </div>
            <div
              className="grid grid-rows-1 justify-items-stretch h-full content-end"
              data-sal="slide-down"
              data-sal-easing="ease"
              data-sal-duration="2000"
            >
              <div className="font-montserrat text-md font-light text-neutral-600 p-3 pb-5 align-middle justify-self-center justify-center w-full lg:w-1/2 mt-5 border-t-2 border-neutral-600">
                <div className="flex flex-row w-full">
                  <div className="flex w-1/3 justify-start">
                    <a
                      href="https://www.kartavyas.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-code-slash"
                        viewBox="0 0 16 16"
                        className="hover:text-white"
                      >
                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                      </svg>
                    </a>
                  </div>
                  <div className="flex w-1/3 justify-items-center justify-center font-mono">
                    <div className="hidden md:flex">
                      {" "}
                      developed&nbsp;by&nbsp;
                      <a
                        href="https://www.kartavyas.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        kartavya
                      </a>
                    </div>
                  </div>
                  <div className="flex w-1/3 justify-items-end justify-end">
                    <div className="flex flex-row space-x-8 items-center justify-between">
                      <a
                        href="https://github.com/KartavyaSharma"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-github"
                          viewBox="0 0 16 16"
                          className="hover:text-white"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      </a>
                      <a href="mailto:kartavya@berkeley.edu">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-envelope-fill"
                          viewBox="0 0 16 16"
                          className="hover:text-white"
                        >
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/kartavya-sharma/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-linkedin"
                          viewBox="0 0 16 16"
                          className="hover:text-white"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
