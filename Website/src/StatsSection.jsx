import React, { useState, useEffect } from "react";

const StatsSection = () => {
  const [students, setStudents] = useState(1000);
  const [courses, setCourses] = useState(50);

  useEffect(() => {
    const incrementStudents = () => {
      setStudents((prev) => prev + 5);
      setTimeout(incrementStudents, 12 * 60 * 60 * 1000);
    };

    const timeoutId = setTimeout(incrementStudents, 12 * 60 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative bg-white flex flex-col items-center justify-center px-4 -mt-10 -mb-20">
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-lg p-6 rounded-lg max-w-7xl z-10 ">
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {students.toLocaleString()}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              +
            </span>
          </h2>
          <p className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 font-semibold">
            STUDENTS
          </p>
        </div>
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {courses.toLocaleString()}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              +
            </span>
          </h2>
          <p className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 font-semibold">
            TUTORIALS
          </p>
        </div>
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            3K
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              +
            </span>
          </h2>
          <p className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 font-semibold">
            COMMUNITY MEMBERS
          </p>
        </div>
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            100
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              %
            </span>
          </h2>
          <p className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 font-semibold">
            SUCCESS RATE
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
