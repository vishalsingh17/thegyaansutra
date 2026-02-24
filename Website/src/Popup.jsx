import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "./assets/Talk.json";
const Popup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
  });

  const [status, setStatus] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course.trim()
    ) {
      setStatus("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/ContactForm", formData);

      if (response.ok) {
        setStatus("Form submitted successfully!");
      } else {
        setStatus("Error submitting form.");
      }
    } catch (error) {
      setStatus("An error occurred");
    } finally {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Left Section */}
        <div className="md:flex md:justify-between">
          <div className="md:w-5/12 flex flex-col items-center mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              You are one step away from your dream career. Fill in your contact
              details and our expert counsellors will reach out to you within 24
              hours.
            </p>

            {/* Flexbox for Logos */}
            <div className="hidden md:flex flex-wrap justify-center items-center gap-4 ">
              {/* Example logos */}
              <Lottie animationData={animationData} loop style={{ height: '250px', width: '250px' }} />

            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-5/12">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your email address"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-3 bg-gray-100 border border-gray-300 rounded-l-lg text-gray-600">
                    +91
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-t border-b border-r border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 placeholder-slate-400"
                  required
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  {/* <option value="Graphic Design">Graphic Design</option>
                  <option value="AI & ML">AI & ML</option> */}
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 font-semibold  text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Get Connected
                </button>
              </div>
            </form>
            {status && (
              <p
                className={`mt-4 text-center ${status.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
