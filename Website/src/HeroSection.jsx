import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import home from './assets/home.json'
import Lottie from 'lottie-react';
const HeroSection = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        `<span class='text-black'>Grow your skills,</span> <span class='text-[#3534fe]'>define your future.</span>`,
      ],
      typeSpeed: 100,
      startDelay: 500,
      showCursor: true,
      cursorChar: "|",
      cursorClass: "typed-cursor",
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="home"
      className="hero bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-[calc(100vh-70px)] flex items-center relative overflow-hidden"
    >
      <div className="absolute w-[700px] h-[700px] bg-blue-300 rounded-full -top-40 -left-32 opacity-50 blur-3xl"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-300 rounded-full top-20 right-20 opacity-40 blur-lg"></div>
      <div className="absolute w-[600px] h-[600px] bg-indigo-200 rounded-full -bottom-32 right-32 opacity-30 blur-2xl"></div>

      <div className="container mx-auto px-8 z-10">
        <div className="hero-wrapper flex flex-col-reverse sm:flex-row items-center justify-between text-center sm:text-left">
          <div className="hero-left sm:flex-1">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#3534fe] to-[#6366f1] text-transparent bg-clip-text">
              <span ref={typedElement}></span>
            </h1>
            <p className="text-base md:text-lg mt-4 text-gray-700">
              Presenting{" "}
              <span className="font-semibold text-[#3534fe]">
                The Gyaan Sutra
              </span>
              , the tech school of the future. We teach you the right skills to
              be prepared for tomorrow.
            </p>
            <div className="mt-3 mb-5 md:mt-8 flex flex-wrap justify-center sm:justify-start md:space-x-4 space-x-1">
              {/* <a
                href="/courses"
                className="bg-[#3534fe] text-white text-sm md:text-base py-2 px-6 rounded-lg shadow-lg hover:bg-white transition transform hover:scale-105 hover:text-[#3534fe]"
              >
                Our Courses
              </a> */}
              <a
                href="/Login"
                className="bg-black text-white text-base md:text-lg py-2 px-6 rounded-lg shadow-lg hover:bg-white transition transform hover:scale-105 hover:text-black"
              >
                Join Us Today
              </a>
            </div>
          </div>

          <div className="hero-right sm:flex-1">
            <Lottie animationData={home} loop={true} autoplay={true}  className="w-9/12 mx-auto sm:mx-0 sm:w-full h-auto" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#6366f1"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,234.7C672,224,768,160,864,138.7C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
