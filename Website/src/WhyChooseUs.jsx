import React from "react";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaHandsHelping,
  FaUsers,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaGraduationCap />,
      label: "Future Ready Curriculum",
      description:
        "Courses designed to prepare you for future challenges and career opportunities.",
    },
    {
      icon: <FaLaptopCode />,
      label: "Hands-on Learning",
      description:
        "Practical sessions and projects that simulate real-world scenarios.",
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "Expert Guidance",
      description:
        "Learn from professionals with years of experience in the field.",
    },
    {
      icon: <FaHandsHelping />,
      label: "Personalised Mentorship",
      description:
        "One-on-one sessions to address your unique learning needs and goals.",
    },
    {
      icon: <FaUsers />,
      label: "Community Access",
      description:
        "A vibrant community to network, share ideas, and grow together.",
    },
    {
      icon: <FaHeadset />,
      label: "On Demand Support",
      description:
        "Round-the-clock assistance to ensure your learning experience is seamless.",
    },
  ];

  return (
    <div className="relative pb-16 bg-white overflow-hidden">
      <h2 className="text-4xl font-semibold text-center text-black mb-12 pt-36">
        Why Choose{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
          Us?
        </span>
      </h2>

      <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-8 lg:px-16 relative z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full md:w-[30%] bg-gradient-to-b from-white to-[#f3f4ff] p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center"
          >
            <div className="text-4xl text-white bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-full shadow-lg mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {feature.label}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-300 to-indigo-500 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 w-full h-40 opacity-40">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            fill="#3534fe"
          >
            <path
              fillOpacity="0.1"
              d="M0,192L60,202.7C120,213,240,235,360,245.3C480,256,600,256,720,234.7C840,213,960,171,1080,144C1200,117,1320,107,1380,101.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>
        <div className="absolute top-16 left-20 text-[#3534fe] opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <div className="absolute bottom-1 right-40 text-[#3534fe] opacity-50 z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l7.5-7.5m0 0l7.5 7.5m-7.5-7.5V21"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
