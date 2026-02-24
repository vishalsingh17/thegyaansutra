// ExploreCourses.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// const coursesData = [

//   { 
//     id: 1, 
//     title: 'Introduction to Artificial Intelligence', 
//     description: 'Learn the basics of AI and its applications.',
//     image: 'https://via.placeholder.com/300x200?text=AI+Course'
//   },
//   { 
//     id: 2, 
//     title: 'React for Beginners', 
//     description: 'A comprehensive guide to start with React.js.',
//     image: 'https://via.placeholder.com/300x200?text=React+Course'
//   },
//   { 
//     id: 3, 
//     title: 'Data Structures and Algorithms', 
//     description: 'Master core computer science concepts.',
//     image: 'https://via.placeholder.com/300x200?text=DSA+Course'
//   },
//   { 
//     id: 4, 
//     title: 'Machine Learning Fundamentals', 
//     description: 'Dive into the world of machine learning.',
//     image: 'https://via.placeholder.com/300x200?text=ML+Course'
//   },
//   { 
//     id: 5, 
//     title: 'Web Development Bootcamp', 
//     description: 'Learn full-stack web development.',
//     image: 'https://via.placeholder.com/300x200?text=Web+Dev+Course'
//   },
// ];

const ExploreCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [coursesData, setCoursesData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/explore/", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setCoursesData(response.data.courses); // Assuming response.data is an array
        }
      } catch (error) {
        console.error("Error");
        window.location.href="/Logout";
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);
  if (isLoading) {
    return <div></div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-white min-h-screen z-0 mt-12 md:mt-0 md:w-[calc(100vw-60px)] md:ml-16">
      <div className="max-w-5xl mx-auto mt-4">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Courses</h1>
          <p className="text-gray-600 text-lg">Find your next learning adventure.</p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Courses List */}
        <div className="flex flex-wrap justify-center gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 w-96"
              >
                <img
                  src={`data:image/png;base64,${course.image}`}
                  alt={course.name}
                  className="w-full h-40 object-contain rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{course.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <a href={`/course/${course.id}`}>
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                    Learn More
                  </button>
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
