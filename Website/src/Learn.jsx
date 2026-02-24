import React from "react";
import { BookOpen, Briefcase } from "lucide-react";
import Lottie from "lottie-react";
import universityAnimation from "./assets/University.json";
import jobAnimation from "./assets/Job.json";

const FeatureCard = ({
  title,
  description,
  animationData,
  Icon,
  animationSize,
  link,
}) => {
  return (
    <a
      href={link}
      className="group relative p-6 border rounded-lg shadow-lg flex flex-col items-center gap-4 bg-white overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Gradient Decorative Ball */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-20 blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-40"></div>

      {/* Icon */}
      <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-md z-10 transition-transform duration-300 group-hover:rotate-6">
        <Icon className="text-white w-8 h-8" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center z-10">
        <h3 className="text-xl font-semibold text-black transition-colors duration-300 group-hover:text-purple-500">
          {title}
        </h3>
        <p className="text-gray-600 mt-2 text-md group-hover:text-gray-800">
          {description}
        </p>
      </div>

      {/* Lottie Animation */}
      <div
        className={`relative z-10 ${animationSize.width} ${animationSize.height}`}
      >
        <Lottie animationData={animationData} loop />
      </div>
    </a>
  );
};

const WhatWillYouLearn = () => {
  const features = [
    {
      title: "University Courses",
      description:
        "Get premium access to a state-of-the-art virtual lab with infinite computing so you won't need additional investments in high-end PCs.",
      animationData: universityAnimation,
      Icon: BookOpen,
      animationSize: { width: "w-80", height: "h-56" },
      link: "/explore?filter=university",
    },
    {
      title: "Job Oriented Courses",
      description:
        "New-age jobs need new-age technology. Build resumes in minutes, apply for exclusive jobs, or hire fresh talent—we've got you covered.",
      animationData: jobAnimation,
      Icon: Briefcase,
      animationSize: { width: "w-64", height: "h-64" },
      link: "/explore?filter=job",
    },
  ];

  return (
    <div
      id="learn"
      className="relative bg-white flex flex-col items-center gap-6 px-4 sm:px-8 py-12 mx-auto overflow-hidden"
    >
      {/* Gradient Decorative Balls */}
      <div className="absolute top-[-120px] left-[-80px] w-[250px] h-[250px] bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] bg-gradient-to-r from-blue-300 to-indigo-500 opacity-20 rounded-full blur-3xl"></div>

      {/* Heading */}
      <h2 className="text-4xl font-semibold text-black text-center z-10">
        What will you{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
          learn?
        </span>
      </h2>

      {/* Description */}
      <p className="text-center text-gray-600 max-w-2xl z-10">
        We offer a unique blend of university and job-oriented courses, designed
        to equip you with both academic knowledge and practical skills, ensuring
        you're prepared for the real world.
      </p>

      {/* Boxes */}
      <div className="flex flex-col md:flex-row md:justify-center md:items-stretch gap-8 p-6 w-full md:w-11/12 lg:w-10/12 z-10">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default WhatWillYouLearn;
