import * as React from "react";
import { Helmet } from "react-helmet";

export default function indexPage() {
  const content =
    '<div class="stack" style="--stacks: 3;"><span style="--index: 0;">rmembr</span><span style="--index: 1;">rmembr</span style="--index: 2;"><span>rmembr</span></div>';

  return (
    <section>
      <Helmet
        htmlAttributes={{ lang: "en" }}
        title="rmembr - academic scheduler"
        meta={[
          { name: "description", content: "rmembr - academic scheduler" },
          { name: "title", content: "rmembr - academic scheduler" },
          {
            property: "keywords",
            content: "rmembr, academic scheduler, active recall, office hours",
          },
          { property: "author", content: "Kartavya Sharma" },
          { property: "og:title", content: "rmembr - academic scheduler" },
          {
            property: "og:description",
            content: "rmembr - academic scheduler",
          },
          {
            property: "og:image",
            content: "../images/bookmark-check-fill-white.png",
          },
          { property: "og:url", content: "https://rmembr.kartavyas.com" },
          { property: "og:type", content: "website" },
        ]}
      >
        <link
          rel="icon"
          type="image/png"
          href="src/images/bookmark-check-fill-white.png"
          sizes="16x16"
        />
      </Helmet>
      <div className="h-screen w-full bg-cover bg-fixed bg-gray-900 relative">
        <div
          className="fixed top-0 w-full z-10"
          data-sal="slide-down"
          data-sal-easing="ease"
          data-sal-duration="1800"
        >
          <svg
            id="visual"
            viewBox="0 0 1980 1080"
            width="1980"
            height="1080"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            className="opacity-50"
          >
            <path
              d="M0 100L22 97.5C44 95 88 90 132 90.3C176 90.7 220 96.3 264 92.3C308 88.3 352 74.7 396 64.2C440 53.7 484 46.3 528 47.7C572 49 616 59 660 64.5C704 70 748 71 792 71.3C836 71.7 880 71.3 924 76.3C968 81.3 1012 91.7 1056 88C1100 84.3 1144 66.7 1188 61C1232 55.3 1276 61.7 1320 62.8C1364 64 1408 60 1452 63.8C1496 67.7 1540 79.3 1584 78.5C1628 77.7 1672 64.3 1716 65.8C1760 67.3 1804 83.7 1848 88.8C1892 94 1936 88 1958 85L1980 82L1980 0L1958 0C1936 0 1892 0 1848 0C1804 0 1760 0 1716 0C1672 0 1628 0 1584 0C1540 0 1496 0 1452 0C1408 0 1364 0 1320 0C1276 0 1232 0 1188 0C1144 0 1100 0 1056 0C1012 0 968 0 924 0C880 0 836 0 792 0C748 0 704 0 660 0C616 0 572 0 528 0C484 0 440 0 396 0C352 0 308 0 264 0C220 0 176 0 132 0C88 0 44 0 22 0L0 0Z"
              fill="#1f2937"
            ></path>
            <path
              d="M0 83L22 79.7C44 76.3 88 69.7 132 62.3C176 55 220 47 264 49C308 51 352 63 396 67.7C440 72.3 484 69.7 528 71.2C572 72.7 616 78.3 660 75.3C704 72.3 748 60.7 792 58.3C836 56 880 63 924 60.7C968 58.3 1012 46.7 1056 41.3C1100 36 1144 37 1188 38.2C1232 39.3 1276 40.7 1320 40.3C1364 40 1408 38 1452 36.8C1496 35.7 1540 35.3 1584 43.2C1628 51 1672 67 1716 66.3C1760 65.7 1804 48.3 1848 40.7C1892 33 1936 35 1958 36L1980 37L1980 0L1958 0C1936 0 1892 0 1848 0C1804 0 1760 0 1716 0C1672 0 1628 0 1584 0C1540 0 1496 0 1452 0C1408 0 1364 0 1320 0C1276 0 1232 0 1188 0C1144 0 1100 0 1056 0C1012 0 968 0 924 0C880 0 836 0 792 0C748 0 704 0 660 0C616 0 572 0 528 0C484 0 440 0 396 0C352 0 308 0 264 0C220 0 176 0 132 0C88 0 44 0 22 0L0 0Z"
              fill="#252f3d"
            ></path>
            <path
              d="M0 58L22 53.8C44 49.7 88 41.3 132 38C176 34.7 220 36.3 264 36C308 35.7 352 33.3 396 33.3C440 33.3 484 35.7 528 38C572 40.3 616 42.7 660 47.2C704 51.7 748 58.3 792 55.3C836 52.3 880 39.7 924 35.5C968 31.3 1012 35.7 1056 42C1100 48.3 1144 56.7 1188 55.2C1232 53.7 1276 42.3 1320 41.8C1364 41.3 1408 51.7 1452 50.8C1496 50 1540 38 1584 33.5C1628 29 1672 32 1716 31.8C1760 31.7 1804 28.3 1848 32.2C1892 36 1936 47 1958 52.5L1980 58L1980 0L1958 0C1936 0 1892 0 1848 0C1804 0 1760 0 1716 0C1672 0 1628 0 1584 0C1540 0 1496 0 1452 0C1408 0 1364 0 1320 0C1276 0 1232 0 1188 0C1144 0 1100 0 1056 0C1012 0 968 0 924 0C880 0 836 0 792 0C748 0 704 0 660 0C616 0 572 0 528 0C484 0 440 0 396 0C352 0 308 0 264 0C220 0 176 0 132 0C88 0 44 0 22 0L0 0Z"
              fill="#2b3544"
            ></path>
            <path
              d="M0 25L22 23.7C44 22.3 88 19.7 132 19.7C176 19.7 220 22.3 264 23.7C308 25 352 25 396 22.7C440 20.3 484 15.7 528 18.8C572 22 616 33 660 37.3C704 41.7 748 39.3 792 33.8C836 28.3 880 19.7 924 20.3C968 21 1012 31 1056 33.8C1100 36.7 1144 32.3 1188 28.2C1232 24 1276 20 1320 18.2C1364 16.3 1408 16.7 1452 16.2C1496 15.7 1540 14.3 1584 14C1628 13.7 1672 14.3 1716 15.8C1760 17.3 1804 19.7 1848 19.5C1892 19.3 1936 16.7 1958 15.3L1980 14L1980 0L1958 0C1936 0 1892 0 1848 0C1804 0 1760 0 1716 0C1672 0 1628 0 1584 0C1540 0 1496 0 1452 0C1408 0 1364 0 1320 0C1276 0 1232 0 1188 0C1144 0 1100 0 1056 0C1012 0 968 0 924 0C880 0 836 0 792 0C748 0 704 0 660 0C616 0 572 0 528 0C484 0 440 0 396 0C352 0 308 0 264 0C220 0 176 0 132 0C88 0 44 0 22 0L0 0Z"
              fill="#313b4a"
            ></path>
            <path
              d="M0 23L22 22.5C44 22 88 21 132 21.8C176 22.7 220 25.3 264 25.2C308 25 352 22 396 21.3C440 20.7 484 22.3 528 20.3C572 18.3 616 12.7 660 10.7C704 8.7 748 10.3 792 12C836 13.7 880 15.3 924 15.8C968 16.3 1012 15.7 1056 17.7C1100 19.7 1144 24.3 1188 26.8C1232 29.3 1276 29.7 1320 29.7C1364 29.7 1408 29.3 1452 28.8C1496 28.3 1540 27.7 1584 24.7C1628 21.7 1672 16.3 1716 15.3C1760 14.3 1804 17.7 1848 21.2C1892 24.7 1936 28.3 1958 30.2L1980 32L1980 0L1958 0C1936 0 1892 0 1848 0C1804 0 1760 0 1716 0C1672 0 1628 0 1584 0C1540 0 1496 0 1452 0C1408 0 1364 0 1320 0C1276 0 1232 0 1188 0C1144 0 1100 0 1056 0C1012 0 968 0 924 0C880 0 836 0 792 0C748 0 704 0 660 0C616 0 572 0 528 0C484 0 440 0 396 0C352 0 308 0 264 0C220 0 176 0 132 0C88 0 44 0 22 0L0 0Z"
              fill="#374151"
            ></path>
          </svg>
        </div>
        <div
          className="fixed bottom-0 w-full z-10"
          data-sal="slide-up"
          data-sal-easing="ease"
          data-sal-duration="1800"
        >
          <svg
            id="visual"
            viewBox="0 0 1980 1080"
            width="1980"
            height="1080"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            className="opacity-50"
          >
            <path
              d="M0 978L22 980.5C44 983 88 988 132 987.7C176 987.3 220 981.7 264 985.7C308 989.7 352 1003.3 396 1013.8C440 1024.3 484 1031.7 528 1030.3C572 1029 616 1019 660 1013.5C704 1008 748 1007 792 1006.7C836 1006.3 880 1006.7 924 1001.7C968 996.7 1012 986.3 1056 990C1100 993.7 1144 1011.3 1188 1017C1232 1022.7 1276 1016.3 1320 1015.2C1364 1014 1408 1018 1452 1014.2C1496 1010.3 1540 998.7 1584 999.5C1628 1000.3 1672 1013.7 1716 1012.2C1760 1010.7 1804 994.3 1848 989.2C1892 984 1936 990 1958 993L1980 996L1980 1081L1958 1081C1936 1081 1892 1081 1848 1081C1804 1081 1760 1081 1716 1081C1672 1081 1628 1081 1584 1081C1540 1081 1496 1081 1452 1081C1408 1081 1364 1081 1320 1081C1276 1081 1232 1081 1188 1081C1144 1081 1100 1081 1056 1081C1012 1081 968 1081 924 1081C880 1081 836 1081 792 1081C748 1081 704 1081 660 1081C616 1081 572 1081 528 1081C484 1081 440 1081 396 1081C352 1081 308 1081 264 1081C220 1081 176 1081 132 1081C88 1081 44 1081 22 1081L0 1081Z"
              fill="#1f2937"
            ></path>
            <path
              d="M0 995L22 998.3C44 1001.7 88 1008.3 132 1015.7C176 1023 220 1031 264 1029C308 1027 352 1015 396 1010.3C440 1005.7 484 1008.3 528 1006.8C572 1005.3 616 999.7 660 1002.7C704 1005.7 748 1017.3 792 1019.7C836 1022 880 1015 924 1017.3C968 1019.7 1012 1031.3 1056 1036.7C1100 1042 1144 1041 1188 1039.8C1232 1038.7 1276 1037.3 1320 1037.7C1364 1038 1408 1040 1452 1041.2C1496 1042.3 1540 1042.7 1584 1034.8C1628 1027 1672 1011 1716 1011.7C1760 1012.3 1804 1029.7 1848 1037.3C1892 1045 1936 1043 1958 1042L1980 1041L1980 1081L1958 1081C1936 1081 1892 1081 1848 1081C1804 1081 1760 1081 1716 1081C1672 1081 1628 1081 1584 1081C1540 1081 1496 1081 1452 1081C1408 1081 1364 1081 1320 1081C1276 1081 1232 1081 1188 1081C1144 1081 1100 1081 1056 1081C1012 1081 968 1081 924 1081C880 1081 836 1081 792 1081C748 1081 704 1081 660 1081C616 1081 572 1081 528 1081C484 1081 440 1081 396 1081C352 1081 308 1081 264 1081C220 1081 176 1081 132 1081C88 1081 44 1081 22 1081L0 1081Z"
              fill="#252f3d"
            ></path>
            <path
              d="M0 1020L22 1024.2C44 1028.3 88 1036.7 132 1040C176 1043.3 220 1041.7 264 1042C308 1042.3 352 1044.7 396 1044.7C440 1044.7 484 1042.3 528 1040C572 1037.7 616 1035.3 660 1030.8C704 1026.3 748 1019.7 792 1022.7C836 1025.7 880 1038.3 924 1042.5C968 1046.7 1012 1042.3 1056 1036C1100 1029.7 1144 1021.3 1188 1022.8C1232 1024.3 1276 1035.7 1320 1036.2C1364 1036.7 1408 1026.3 1452 1027.2C1496 1028 1540 1040 1584 1044.5C1628 1049 1672 1046 1716 1046.2C1760 1046.3 1804 1049.7 1848 1045.8C1892 1042 1936 1031 1958 1025.5L1980 1020L1980 1081L1958 1081C1936 1081 1892 1081 1848 1081C1804 1081 1760 1081 1716 1081C1672 1081 1628 1081 1584 1081C1540 1081 1496 1081 1452 1081C1408 1081 1364 1081 1320 1081C1276 1081 1232 1081 1188 1081C1144 1081 1100 1081 1056 1081C1012 1081 968 1081 924 1081C880 1081 836 1081 792 1081C748 1081 704 1081 660 1081C616 1081 572 1081 528 1081C484 1081 440 1081 396 1081C352 1081 308 1081 264 1081C220 1081 176 1081 132 1081C88 1081 44 1081 22 1081L0 1081Z"
              fill="#2b3544"
            ></path>
            <path
              d="M0 1053L22 1054.3C44 1055.7 88 1058.3 132 1058.3C176 1058.3 220 1055.7 264 1054.3C308 1053 352 1053 396 1055.3C440 1057.7 484 1062.3 528 1059.2C572 1056 616 1045 660 1040.7C704 1036.3 748 1038.7 792 1044.2C836 1049.7 880 1058.3 924 1057.7C968 1057 1012 1047 1056 1044.2C1100 1041.3 1144 1045.7 1188 1049.8C1232 1054 1276 1058 1320 1059.8C1364 1061.7 1408 1061.3 1452 1061.8C1496 1062.3 1540 1063.7 1584 1064C1628 1064.3 1672 1063.7 1716 1062.2C1760 1060.7 1804 1058.3 1848 1058.5C1892 1058.7 1936 1061.3 1958 1062.7L1980 1064L1980 1081L1958 1081C1936 1081 1892 1081 1848 1081C1804 1081 1760 1081 1716 1081C1672 1081 1628 1081 1584 1081C1540 1081 1496 1081 1452 1081C1408 1081 1364 1081 1320 1081C1276 1081 1232 1081 1188 1081C1144 1081 1100 1081 1056 1081C1012 1081 968 1081 924 1081C880 1081 836 1081 792 1081C748 1081 704 1081 660 1081C616 1081 572 1081 528 1081C484 1081 440 1081 396 1081C352 1081 308 1081 264 1081C220 1081 176 1081 132 1081C88 1081 44 1081 22 1081L0 1081Z"
              fill="#313b4a"
            ></path>
            <path
              d="M0 1055L22 1055.5C44 1056 88 1057 132 1056.2C176 1055.3 220 1052.7 264 1052.8C308 1053 352 1056 396 1056.7C440 1057.3 484 1055.7 528 1057.7C572 1059.7 616 1065.3 660 1067.3C704 1069.3 748 1067.7 792 1066C836 1064.3 880 1062.7 924 1062.2C968 1061.7 1012 1062.3 1056 1060.3C1100 1058.3 1144 1053.7 1188 1051.2C1232 1048.7 1276 1048.3 1320 1048.3C1364 1048.3 1408 1048.7 1452 1049.2C1496 1049.7 1540 1050.3 1584 1053.3C1628 1056.3 1672 1061.7 1716 1062.7C1760 1063.7 1804 1060.3 1848 1056.8C1892 1053.3 1936 1049.7 1958 1047.8L1980 1046L1980 1081L1958 1081C1936 1081 1892 1081 1848 1081C1804 1081 1760 1081 1716 1081C1672 1081 1628 1081 1584 1081C1540 1081 1496 1081 1452 1081C1408 1081 1364 1081 1320 1081C1276 1081 1232 1081 1188 1081C1144 1081 1100 1081 1056 1081C1012 1081 968 1081 924 1081C880 1081 836 1081 792 1081C748 1081 704 1081 660 1081C616 1081 572 1081 528 1081C484 1081 440 1081 396 1081C352 1081 308 1081 264 1081C220 1081 176 1081 132 1081C88 1081 44 1081 22 1081L0 1081Z"
              fill="#374151"
            ></path>
          </svg>
        </div>
        <div className="px-8 py-32 w-full h-full z-50">
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
                  <span className="scale-100"> rmembr </span>{" "}
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
              <div className="font-montserrat text-xl lg:text-3xl xl:5xl font-bold text-gray-600 p-5 align-middle justify-self-center justify-center w-full lg:w-1/2">
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
              <div className="font-montserrat text-md lg:text-lg 2xl:text-xl font-light text-gray-600 p-3 pb-5 align-middle justify-self-center justify-center w-full lg:w-1/2">
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
            <div className="flex w-full my-5 justify-center z-[100]">
              <div
                className="flex w-full justify-center text-center"
                data-sal="zoom-out"
                data-sal-easing="ease"
                data-sal-duration="2000"
              >
                <a
                  className="relative inline-flex items-center px-4  xl:px-8 py-1/2 lg:py-2 2xl:py-3 overflow-hidden text-gray-600 border-2 border-current rounded group active:text-gray-600 focus:outline-none focus:none"
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
              className="grid grid-rows-1 justify-items-stretch h-full content-end z-[100]"
              data-sal="slide-down"
              data-sal-easing="ease"
              data-sal-duration="2000"
            >
              <div className="font-montserrat text-md font-light text-gray-600 p-3 pb-5 align-middle justify-self-center justify-center w-full lg:w-1/2 mt-5 border-t-2 border-gray-600">
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
