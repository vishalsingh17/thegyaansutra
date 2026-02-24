import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
import Navbar from "./Navbar";
import logo from "./assets/logo.json";
import Lottie from "lottie-react";
import HeroSection from "./HeroSection";
import Contact from "./Contact";
import About from "./About";
import StatsSection from "./StatsSection";
// import CompanyLogo from "./CompanyLogo";
import Testimonials from "./Testimonials";
import FAQs from "./FAQs";
import WhyChooseUs from "./WhyChooseUs";
import WhatWillYouLearn from "./Learn";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import SkillsGapSection from "./Skill";
import Problems from "./Problems";
import CTA from "./CTA";
import Feedback from "./Feedback";
import axios from "axios";
import Banner from "./Banner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

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
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post('/api/cookiecheck/');
        if (response.status !== 200) {
          if (!loading) {
            // Show Feedback after 5-7 seconds
            const feedbackTimeout = setTimeout(() => {
              setShowFeedback(true);
            }, 5000);

            return () => clearTimeout(feedbackTimeout);
          }
        }
      }
      catch {
        if (!loading) {
          // Show Feedback after 5-7 seconds
          const feedbackTimeout = setTimeout(() => {
            setShowFeedback(true);
          }, 5000);

          return () => clearTimeout(feedbackTimeout);
        }
      }
    }
    fetchUser();
  }, [loading]);

  const handleFeedbackClose = () => {
    setShowFeedback(false);
  };

  useEffect(() => {
    // Fetch banner data from the backend
    const fetchBannerData = async () => {
      try {
        const response = await axios.get("/api/banner"); // Replace with your backend API endpoint
        if (response.status == 200) {
          setBannerMessage(response.data.message);
          setIsVisible(true); // Show the banner if there's a message
        }
      } catch (error) {
        console.error("Failed to fetch banner data");
      }
    };

    fetchBannerData();
  }, []);

  const handleBannerClose = () => {
    setIsVisible(false);
  };

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
    if (loading == false) {
      Tawk();
    }
  }, [loading]);



  return (
    <>
      <Banner isVisible={isVisible} bannerMessage={bannerMessage} onClose={handleBannerClose} />
      <Navbar isVisible={isVisible} />
      <HeroSection />
      <Problems />
      <About />

      <StatsSection />

      <WhyChooseUs />
      <WhatWillYouLearn />
      <ContactUs />

      <Testimonials />
      <CTA />
      <FAQs />
      <Contact />
      <Footer />
      {showFeedback && <Feedback onClose={handleFeedbackClose} />}
    </>
  );
};
export default Home;
