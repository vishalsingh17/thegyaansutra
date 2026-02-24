import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "./assets/logo.json"
import courses from "./assets/courses.json"
import Learning from "./assets/Google.json"
import Lottie from 'lottie-react';
import { useNavigate } from "react-router-dom";

const Navbar = ({ isVisible }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("University Courses");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState("");
  const [userOpen, setUserOpen] = useState(false);


  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

  // Function to get a cookie value by name
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    const CoursesFetch = async () => {
      try {
        const response = await axios.get('/api/navcourse/', {
          withCredentials: true,
        });
        if (response.status == 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error communicating with the backend');
      }
    };

    CoursesFetch();
  }, []);

  useEffect(() => {
    const userFetch = async () => {
      try {
        const response = await axios.post('/api/cookiecheck/', null, {
          withCredentials: true,
        });
        if (response.status == 200) {
          setUser(response.data.name);
        }
      } catch (error) {
        console.error('Error communicating with the backend');
      }
    }
    userFetch();
  }, []);

  const navigate = useNavigate();
  const toggleNavbar = () => {
    if (mobileDrawerOpen && coursesOpen) {
      setCoursesOpen(false); // Close courses dropdown when drawer closes
    }
    setMobileDrawerOpen(!mobileDrawerOpen);
  };


  const toggleCoursesDropdown = () => {
    setCoursesOpen(!coursesOpen);
  };

  const toggleUserDropdown = () => {
    setUserOpen(!userOpen);
  }

  const funcCourseOpen = () => {
    if (!coursesOpen) setCoursesOpen(true); // Only open if not already open
  };

  const funcCourseClose = () => {
    if (coursesOpen) setCoursesOpen(false); // Only close if open
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const offsets = {
    home: -75,
    about: 0,
    "contact-us": 0,
    learn: 0,
  };

  const navigateToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = offsets[id] || 0;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`hidden lg:block sticky ${isVisible ? "top-10" : "top-0"}  left-0 z-50 w-full py-3 backdrop-blur-lg bg-transparent`}>
        <div className="container px-4 text-sm mx-auto relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <button onClick={() => navigateToSection("home")} className="flex">
                <div className="lottie-container" style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}>
                  <Lottie
                    animationData={logo}
                    loop={true}
                    autoplay={true}
                    style={{ height: '48px', width: '55px' }}
                  />
                </div>
                <div className="my-auto text-lg text-red-600 font font-bold">The Gyaan Sutra</div>
                {/* <img className="w-[3rem] mr-2" src={logo} alt="logo" /> */}
              </button>
            </div>
            <ul className="hidden lg:flex space-x-12 ml-14 cursor-pointer font-jakarta font-bold">
              <li className="text-[#161637] hover:text-[#4d4dff] font-semibold my-auto" onClick={() => navigateToSection("home")}>HOME</li>
              <li
                className="relative text-[#161637] hover:text-[#4d4dff] flex items-center font-semibold"
                onClick={toggleCoursesDropdown}
              >
                <div className="lottie-container" style={{ transform: 'scale(2.0)', transformOrigin: 'center' }}>
                  <Lottie
                    animationData={courses}
                    loop={true}
                    autoplay={true}
                    style={{ height: '48px', width: '55px' }}
                  />
                </div>
                <span>COURSES</span>
                <ChevronDown
                  className={`ml-1 ${coursesOpen ? "rotate-180" : ""}`}
                />
                {coursesOpen && (
                  <div className="absolute top-full left-2/4 mx-auto transform -translate-x-1/2 mt-4 bg-[#fafafa] shadow-lg rounded-lg w-[950px] p-4 z-40 flex items-center border-2 ">
                    {/* Sidebar with Categories */}
                    <div className="w-3/12 pr-4">
                      {categories.map((category) => (
                        <div
                          key={category.name}
                          className={`p-2 cursor-pointer font-semibold ${selectedCategory === category.name
                            ? "text-blue-600"
                            : "text-gray-700"
                            }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(category.name);
                          }}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>

                    {/* Courses on the Right */}
                    <div className="w-9/12 pl-4 grid grid-cols-2 items-start gap-4 border-l">
                      {categories
                        .find((cat) => cat.name === selectedCategory)
                        ?.courses?.map((course) => (
                          <a href={"/course/" + course.course_id} className="mx-auto" key={course.course_id}>
                            <div
                              className="p-2 border rounded-lg shadow-sm flex items-center cursor-pointer hover:bg-blue-100 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <h4 className="text-sm font-bold text-gray-700">
                                {course.name}
                              </h4>
                            </div>
                          </a>
                        ))}
                    </div>

                  </div>
                )}
              </li>
              <li className="text-[#161637] hover:text-[#4d4dff] font-semibold my-auto" onClick={() => navigateToSection("about")}>ABOUT US</li>
              <li className="text-[#161637] hover:text-[#4d4dff] font-semibold my-auto" onClick={() => navigateToSection("contact-us")}>
                CONTACT US
              </li>
            </ul>
            <div className="flex justify-center items-center space-x-12">
              {user ? (
                <>
                  <button className="rounded-full text-black bg-gray-200 text-xl py-2 px-4  hover:bg-[#4d4dff] hover:text-white" onClick={toggleUserDropdown}>{user.charAt(0)}</button>
                  {userOpen && (
                    <div className="absolute top-[3.75rem] right-0 mx-auto transform  bg-gray-50 shadow-xl  z-40 p-5 rounded-md">
                      <ul className="text-center space-y-2 font-semibold">
                        <li className="transform hover:scale-105 transition-transform duration-300"><a href="/dashboard/enrolledcourses">Dashboard</a></li>
                        <li className="transform hover:scale-105 transition-transform duration-300"><a href="/dashboard/profile">Profile</a></li>
                        <li className="transform hover:scale-105 transition-transform duration-300"><a href="/Logout">Logout</a></li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <button className=" text-white bg-black rounded-md font-bold my-auto flex space-x-2 px-3" onClick={() => navigate("/login")}>
                  <div className="lottie-container" style={{ transform: 'scale(2.0)', transformOrigin: 'center' }}>
                    <Lottie
                      animationData={Learning}
                      loop={true}
                      autoplay={true}
                      style={{ height: '45px', width: '35px' }}
                    />
                  </div>
                  <div className="my-3 mr-3 ml-1">
                    Sign In
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <nav className={`lg:hidden relative ${isVisible ? "top-0" : "top-0"} left-0 z-50 w-full py-3 backdrop-blur-lg bg-transparent`}>
        <div className="container text-sm mx-auto relative">
          <div className="flex justify-between items-center px-5">
            <div className="flex items-center flex-shrink-0">
              <button onClick={() => navigateToSection("home")} className="flex">
                <div className="lottie-container" style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}>
                  <Lottie
                    animationData={logo}
                    loop={true}
                    autoplay={true}
                    style={{ height: '48px', width: '55px' }}
                  />
                </div>
                <div className="my-auto text-lg text-red-600 font-bold">The Gyaan Sutra</div>
                {/* <img className="w-[3rem] mr-2" src={logo} alt="logo" /> */}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <button className="rounded-full text-black bg-gray-200 text-xl py-2 px-4  hover:bg-[#4d4dff] hover:text-white" onClick={toggleUserDropdown}>{user.charAt(0)}</button>
                  {userOpen && (
                    <div className="absolute top-[3.75rem] right-1 mx-auto transform  bg-gray-50 shadow-xl  z-40 p-5 rounded-md">
                      <ul className="text-center space-y-2 font-semibold">
                        <li className="transform hover:scale-105 transition-transform duration-300"><a href="/dashboard/enrolledcourses">Dashboard</a></li>
                        <li className="transform hover:scale-105 transition-transform duration-300"><a href="/dashboard/profile">Profile</a></li>
                        <li className="transform hover:scale-105 transition-transform duration-300"><a href="/Logout">Logout</a></li>
                      </ul>
                    </div>
                  )}
                </>
              )}
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? (
                  <X stroke="#161637" />
                ) : (
                  <Menu stroke="#161637" />
                )}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <>
              {!coursesOpen ? (
                <div className="relative flex flex-col justify-center items-center w-full lg:hidden">
                  <ul className="py-2 cursor-pointer text-lg text-center">
                    <li className="text-[#4d4dff] font-semibold p-4" onClick={() => navigateToSection("home")}>HOME</li>
                    <li
                      onClick={funcCourseOpen}
                      className="text-[#4d4dff] text-center font-semibold p-4"
                    >
                      COURSES
                    </li>
                    <li className="text-[#4d4dff] font-semibold p-4" onClick={() => navigateToSection("about")}>ABOUT US</li>
                    <li className="text-[#4d4dff] font-semibold p-4" onClick={() => navigateToSection("contact-us")}>CONTACT US</li>
                  </ul>
                  {!user && (
                    <a href="/Login">
                      <button className="bg-[#3534fe] text-white py-2 px-3 rounded-md font-bold text-base mb-3">
                        Sign In
                      </button>
                    </a>
                  )}
                </div>
              ) : (
                <>
                  <div className="relative flex flex-col justify-center items-center w-full">
                    {categories.map((category) => (
                      <div key={category.name} className="mb-4">
                        <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                        <ul>
                          {category.courses.map((course) => (
                            <li key={course.course_id} className="text-sm text-center">
                              <a href={"/course/" + course.course_id} className="text-blue-500 hover:underline">
                                {course.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>;

                </>
              )
              }
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
