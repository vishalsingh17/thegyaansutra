import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Confused.json";
import Popup from "../Popup";

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-around w-full min-h-[30vh] bg-black px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 max-w-sm flex justify-center md:justify-start">
        <Lottie animationData={animationData} loop style={{ height: "250px", width: "250px" }} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center md:items-start text-white space-y-4 w-full md:w-1/2 px-4 text-center md:text-left mt-6 md:mt-0">
        <h1 className="text-xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
        Still Confused?
        </h1>
        <p className="text-sm md:text-lg max-w-xl">
        Get Connected to our experts and know what's best for you..
        </p>
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={openModal}
            className="bg-[#f3f4ff] text-black font-medium py-2 px-6 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300"
            aria-label="Let's talk about your learning journey"
          >
            Let's Talk
          </button>
          <a href="/login">
            <button
              className="bg-gradient-to-r from-purple-400 to-blue-400 text-white py-2 px-8 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300 mb-4 md:mb-0"
              aria-label="Start learning now"
            >
              Sign In
            </button>
          </a>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Popup onClose={closeModal} />}
    </div>
  );
};

export default CTA;
