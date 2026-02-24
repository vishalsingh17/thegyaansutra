import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Details = ({ course }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [semester, setSemester] = useState([]);

  useEffect(() => {
    setSemester(course?.semesters || []);
  }, [course]);

  const toggleMODULE = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMouseOver = (index) => {
    setHoverIndex(index);
  };

  const handleMouseOut = () => {
    setHoverIndex(null);
  };

  return (
    <div id="curriculum" className="flex justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-100 to-purple-50 py-16">
      <div className="module-wrapper space-y-8 relative p-6 max-w-6xl w-full">
        {semester.map((module, index) => (
          <div
            key={index}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            className="module-block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mx-auto w-full max-w-6xl"
          >
            <div
              className="module-top flex justify-between items-center py-4 px-6 bg-white cursor-pointer"
              onClick={() => toggleMODULE(index)}
            >
              {course.course_type == "job" ? (
                <h5 className="text-lg font-medium text-gray-800">
                  {module.name}
                </h5>
              ) :
                (
                  <a href={`/course/${course.course_id}/${module.num}/`} className="hover:underline">
                    <h5 className="text-lg font-medium text-gray-800">
                      {module.name}
                    </h5>
                  </a>
                )}
              <div className="flex">
                {hoverIndex === index && (
                  <div className="text-sm text-gray-500 mr-2">Module Details</div>
                )}
                <ExpandMoreIcon
                  className={`transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                    }`}
                />
              </div>
            </div>
            <Collapse in={activeIndex === index}>
              <div className="module-bottom px-6 text-left bg-white ">
                <div className="font-medium text-gray-700">
                  What you&apos;ll learn
                </div>
                <ul className="list-disc space-y-2 py-4 pl-5">
                  {module.learn.map((learn, index) => (
                    <li key={index} className="font-light text-sm text-gray-600">{learn}</li>
                  ))}
                </ul>
                <div className="font-medium text-gray-700">
                  Skills you&apos;ll gain
                </div>
                <div className="flex flex-wrap">
                  {module.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-[#e8eef7] p-1 px-3 w-fit mr-3 mb-3 rounded-md text-sm text-gray-700"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
