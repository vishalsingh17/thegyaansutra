import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Details from "./Details";
import axios from "axios";
import About from "./About";
// import Card from './Cards'
import SkillsSection from "./Skills";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CTA from "./CTA";
import Testimonials from "./Testimonials";
import FAQs from "./FAQs";

const Common = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    const checkLogin = async () => {
      const response = await axios.post("/api/cookiecheck/", null, {
        withCredentials: true,
      })
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/course/${courseName}/`);
        if (response.status === 200) {
          setCourse(response.data);
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        window.location.href = "/";
      }
    };
    fetchCourseDetails();
  }, [courseName]);

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
    if (isLoading == false) {
      Tawk();
    }
  }, [isLoading]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (isLoggedIn && course) {
        try {
          const params = new URLSearchParams();
          params.append("course_id", course.course_id);

          const response = await axios.post(
            "/api/isenrolled/",
            params.toString(),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            setIsEnrolled(true);
          } else {
            setIsEnrolled(false);
          }
        } catch (error) {
          setIsEnrolled(false);
        } finally {
          setIsLoading(false);
        }
      }
      else {
        setIsLoading(false);
      }
    };
    checkEnrollment();
  }, [isLoggedIn, course]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Navbar />
      {course && (
        <>
          <Hero course={course} isLoggedIn={isLoggedIn} isEnrolled={isEnrolled} />
          {/* <Card course={course}/> */}
          <About course={course} />
          <SkillsSection course={course} />
          <Details course={course} isLoggedIn={isLoggedIn} isEnrolled={isEnrolled} />
          <Testimonials course={course} />
          <CTA course={course} />
          <FAQs course={course} />
          <Footer course={course} />
        </>
      )}
    </>
  );
};

export default Common;
