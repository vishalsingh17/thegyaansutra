import React from "react";
import { Checkbox } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CloseIcon from '@mui/icons-material/Close';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const Lecture = ({ sections, onLectureSelect }) => {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-4">Course Content</h2>
        <a href="/dashboard/enrolledcourses"><CloseIcon /></a>
      </div>
      <ul>
        {sections.map((section, index) => (
          <li
            key={index}
            className={`flex items-center p-2 rounded mb-2 ${section.completed ? "bg-green-100" : "bg-white"
              } hover:bg-gray-100 cursor-pointer`}
            onClick={() => onLectureSelect(index, section.videoUrl)}
          >
            <div className="flex-grow">
              <div className="font-medium">{section.title}</div>
              <div className="text-sm text-gray-500">{section.duration}</div>
            </div>
            <div className="space-x-3">
              {section.completed ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <OndemandVideoIcon className="text-gray-500" />
              )}
              {section.documentUrl && (
                <a href={section.documentUrl} target="_blank">
                  <FolderOpenIcon className="text-gray-500" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lecture;
