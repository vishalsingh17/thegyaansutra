import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillsSection = ({ course }) => {
  const [allSkills, setAllSkills] = useState([]);
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const initialSkillCount = 12;

  useEffect(() => {
    const skills = course.skills || [];
    setAllSkills(skills);
    setVisibleSkills(skills.slice(0, initialSkillCount));
  }, [course]);

  const handleViewAllClick = () => {
    if (isExpanded) {
      setVisibleSkills(allSkills.slice(0, initialSkillCount)); // Collapse to initial skills
    } else {
      setVisibleSkills(allSkills); // Expand to show all skills
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-6 bg-white rounded-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Skills you'll gain</h2>
      <div className="flex flex-wrap gap-3">
        {/* Render all visible skills */}
        {visibleSkills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg flex items-center transition-transform transform hover:scale-105"
          >
            {skill}
          </span>
        ))}

        {/* Button to toggle skills */}
        {allSkills.length > initialSkillCount && (
          <button
            onClick={handleViewAllClick}
            className="text-purple-800 hover:underline text-sm font-medium flex items-center"
          >
            {isExpanded ? "Show less" : "View all skills"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
