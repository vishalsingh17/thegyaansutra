import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import LectureList from './Lecture';
import { useParams } from "react-router-dom";
import axios from "axios";
import qs from 'qs';


const MainLayout = () => {
  const { subjectId } = useParams();
  const [sections, setSections] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/video/${subjectId}/`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setSections(response.data.videos);
        } else if (response.status === 204) {
          window.location.href = "/Logout";
        }
      } catch (error) {
        window.location.href = "/dashboard/enrolledcourses"
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId]);


  // Mainlayout.jsx

  const handleLectureSelect = (index, videoUrl) => {
    setCurrentVideo(null);
    setTimeout(() => setCurrentVideo(videoUrl), 100);
  };

  const handleVideoEnd = async () => {
    try {
      // Prepare URL-encoded data
      const data = qs.stringify({ videoUrl: currentVideo });

      // Make a POST request to mark the video as viewed
      await axios.post(
        '/api/markviewed/',
        data, // Send the URL-encoded data in the request body
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      // Update the state to mark the video as completed
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.videoUrl === currentVideo ? { ...section, completed: true } : section
        )
      );
    } catch (error) {
      console.error('Error marking video as viewed');
    }
  };

  if (loading) {
    return <div></div>
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">

      <div className="flex-1 bg-gray-800 flex items-center justify-center min-h-64 md:min-h-0">
        {currentVideo ? (
          <VideoPlayer videoUrl={currentVideo} onVideoEnd={handleVideoEnd} />
        ) : (
          <p className="text-white text-xl text-center">Select a lecture to play the video.</p>
        )}
      </div>

      <div className="w-full md:w-1/3 bg-white  h-full border-l">
        <LectureList sections={sections} onLectureSelect={handleLectureSelect} />
      </div>
    </div>
  );
};

export default MainLayout;