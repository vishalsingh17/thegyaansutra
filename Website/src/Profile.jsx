import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GitHub,
  LinkedIn,
  Person,
  Email,
  Phone,
  Save,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
  });

  // Axios configuration
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

  // CSRF Token Helper
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/getprofile/");
        setProfile(response.data.data);
      } catch (error) {
        toast.error("Error fetching profile data!");
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/updateprofile/", { profile });
      toast.success("Profile updated successfully!");
      console.log("Updated profile:", response.data);
    } catch (error) {
      toast.error("Error updating profile!");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl md:ml-14">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Personal Information</h2>
          <p className="text-gray-600 mt-2">Update your details to keep your profile up-to-date.</p>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex items-center gap-3">
            <Person className="text-black" />
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-md"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Email className="text-black" />
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-300 rounded-lg p-2 shadow-md"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-black" />
            <div className="flex-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-md"
              />
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-3">
            <GitHub className="text-black" />
            <div className="flex-1">
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub Profile
              </label>
              <input
                type="text"
                id="github"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-md"
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-3">
            <LinkedIn className="text-black" />
            <div className="flex-1">
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn Profile
              </label>
              <input
                type="text"
                id="linkedin"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8 transform hover:scale-105 transition-transform duration-300">
          <button
            className="bg-neutral-800 hover:bg-neutral-900 text-white py-2 px-6 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg transition"
            onClick={handleSubmit}
          >
            <Save />
            <span className="font-medium">Save Changes</span>
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
};

export default ProfilePage;
