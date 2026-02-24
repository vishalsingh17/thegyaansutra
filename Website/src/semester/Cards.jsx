import React from "react";

const CourseInfoCard = () => {
  return (
    <div className="flex flex-col justify-center md:flex-row bg-white shadow-xl rounded-lg p-6 md:space-x-6 space-y-4 md:space-y-0 transition-transform transform ">
      {/* Course Series */}
      <div className="flex flex-col " >
        <h4 className="text-lg font-bold text-blue-600">8 course series</h4>
        <p className="text-sm text-gray-600">
          Earn a career credential that demonstrates your expertise
        </p>
      </div>

      {/* Ratings */}
      <div className="flex items-center space-x-2 border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
        <span className="text-lg font-semibold">4.8</span>
        <span className="text-blue-500 text-sm">⭐</span>
        <span className="text-sm text-gray-500">(147,373 reviews)</span>
      </div>

      {/* Beginner Level */}
      <div className="flex flex-col border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
        <h4 className="text-lg font-bold">Beginner level</h4>
        <p className="text-sm text-gray-600 flex items-center">
          Recommended experience
          <span className="ml-2 text-blue-500 cursor-pointer">ℹ️</span>
        </p>
      </div>

      {/* Flexible Schedule */}
      <div className="flex flex-col border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
        <h4 className="text-lg font-bold">Flexible schedule</h4>
        <p className="text-sm text-gray-600">
          6 months, 10 hours a week. Learn at your own pace.
        </p>
      </div>

      {/* Build Toward a Degree */}
      <div className="flex flex-col border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
        <h4 className="text-lg font-bold">Build toward a degree</h4>
        <a href="#learn-more" className="text-blue-500 text-sm">
          Learn more
        </a>
      </div>
    </div>
  );
};

export default CourseInfoCard;
