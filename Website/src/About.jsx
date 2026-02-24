import React from "react";
import img1 from "./assets/about.png";

const About = () => {
  return (
    <div
      id="about"
      className="relative bg-white flex flex-col items-center justify-center p-6 lg:flex-row lg:p-12 overflow-hidden"
    >
      {/* <div className="absolute top-[-100px] left-[-80px] w-[200px] h-[200px] bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl"></div> */}
      {/* <div className="absolute bottom-[-100px] right-[-50px] w-[300px] h-[300px] bg-gradient-to-r from-blue-300 to-indigo-500 opacity-20 rounded-full blur-3xl"></div> */}

      <svg
        className="absolute top-10 left-[10%] w-[120px] h-[120px] opacity-40 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="4" cy="4" r="2" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="20" cy="4" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
        <circle cx="4" cy="20" r="2" />
        <circle cx="12" cy="20" r="2" />
        <circle cx="20" cy="20" r="2" />
      </svg>

      <svg
        className="absolute top-[50%] left-[85%] w-[80px] h-[80px] text-purple-300 opacity-40 transform -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2.5l1.74 5.35h5.62l-4.56 3.32 1.74 5.35L12 13.2l-4.56 3.32 1.74-5.35-4.56-3.32h5.62z" />
      </svg>

      <svg
        className="absolute bottom-[-10%] left-[30%] w-[300px] h-[300px] opacity-25 text-pink-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M2 20c1.5-4.5 4.5-7.5 10-7.5s8.5 3 10 7.5H2z" />
      </svg>

      <div className="lg:max-w-lg lg:w-1/2 flex justify-center lg:justify-end mb-6 lg:mb-0 mt-12">
        <img
          src={img1}
          alt="About Academy"
          className="w-[370px] h-auto relative z-10"
        />
      </div>

      <div className="w-full max-w-md lg:max-w-lg lg:w-1/2 text-center lg:text-left lg:pl-8 lg:ml-20 scxl:ml-48 relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-black">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
            Gyaan Sutra
          </span>
        </h2>
        <p className="text-gray-700 mb-4 text-md">
          The Gyaan Sutra offers a unique blend of expert guidance, practical
          learning, and industry insights. It equips you with the right tools,
          knowledge, and support to excel in tech careers, making your career
          advancement smoother and more accessible.
        </p>
        <p className="text-gray-700 mb-6 text-md">
          It's not just learning - it's about real-world application,
          personalized mentorship, and ensuring you're prepared to thrive in the
          competitive job market.
        </p>
      </div>
    </div>
  );
};

export default About;
