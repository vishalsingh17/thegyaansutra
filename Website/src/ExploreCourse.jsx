import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import logo from "./assets/logo.json";
import Lottie from "lottie-react";

const ExploreCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/allcourse/", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setCourses(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error("Error fetching courses");
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);
  useEffect(() => {
    const Tawk = () => {
      const Tawk_API = window.Tawk_API || {};
      const Tawk_LoadStart = new Date();

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/673c9bf62480f5b4f5a06d26/1id2c2f5u";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);

      return () => {
        // Cleanup if necessary (e.g., remove global variables or script)
        script.remove();
        delete window.Tawk_API;
      };
    };
    Tawk();
  }, []);

  // Handle filter changes from URL params
  useEffect(() => {
    const initialFilter = searchParams.get("filter") || "";
    setFilter(initialFilter);
  }, [searchParams]);

  // Filtered courses logic
  const filteredCourses = Array.isArray(courses)
    ? courses.filter((course) => {
      const matchesFilter = filter
        ? course.filterCategory.toLowerCase() === filter.toLowerCase()
        : true;
      const matchesSearch = course.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    : [];

  return (
    <div className="relative p-0 bg-white min-h-screen overflow-hidden">
      <a href="/" className="flex m-3 cursor-pointer">
        <div
          className="lottie-container"
          style={{ transform: "scale(1.5)", transformOrigin: "center" }}
        >
          <Lottie
            animationData={logo}
            loop={true}
            autoplay={true}
            style={{ height: "48px", width: "55px" }}
          />
        </div>
        <span className="my-auto text-lg text-red-600 font-bold">
          The Gyaan Sutra
        </span>
      </a>

      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500 to-purple-500 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute top-[40rem] left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-[40rem] right-0 w-96 h-96 bg-gradient-to-tl from-pink-500 to-purple-500 rounded-full opacity-30 blur-3xl"></div>
      <div className="relative max-w-6xl mx-auto pb-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-black">
          Explore Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
            Courses
          </span>
        </h1>
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              className={`px-6 py-3 rounded-full font-semibold text-white ${filter === "" ? "bg-purple-500" : "bg-gray-400"
                }`}
              onClick={() => setFilter("")}
            >
              All
            </button>
            <button
              className={`px-6 py-3 rounded-full font-semibold text-white ${filter === "university" ? "bg-purple-500" : "bg-gray-400"
                }`}
              onClick={() => setFilter("university")}
            >
              University
            </button>
            <button
              className={`px-6 py-3 rounded-full font-semibold text-white ${filter === "job" ? "bg-purple-500" : "bg-gray-400"
                }`}
              onClick={() => setFilter("job")}
            >
              Job
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <a href={`/course/${course.id}`} key={index}>
              <div className="p-6 bg-white border border-gray-200 rounded-lg max-w-xl mx-auto transform hover:scale-105 transition-transform duration-300">
                <img
                  src={`data:image/png;base64,${course.image}`}
                  alt={course.name}
                  className="w-full h-40 object-contain rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-purple-600 mb-2 text-center">
                  {course.name}
                </h2>
                <p className="text-sm text-black text-center">
                  {course.description}
                </p>
              </div>
            </a>
          ))}
          {filteredCourses.length === 0 && (
            <p className="col-span-full text-center text-black text-lg">
              No courses found. Try a different search or filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourse;
