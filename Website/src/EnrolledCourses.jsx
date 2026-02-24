import React, { useState, useEffect } from "react";
import axios from "axios";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/enrolled/", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setCourses(response.data.subjects);
        }
      } catch (error) {
        window.location.href = "/Logout";
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);
  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className="p-6 bg-white min-h-screen z-0 mt-12 md:mt-0 md:w-[calc(100vw-60px)] md:ml-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 mt-6 md:mt-0">Enrolled Courses</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden w-72 sm:w-80 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <a href={`/video/${course.id}/`}>
                  <img
                    src={`data:image/png;base64,${course.image}`}
                    alt={course.name}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h2>
                    <p className="text-gray-600 text-sm">{course.description}</p>
                  </div>
                </a>
              </div>
            ))) : (
            <div>You have No Enrolled Course</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrolledCourses;
