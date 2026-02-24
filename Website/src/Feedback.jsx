import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "./assets/Talk.json";

const Feedback = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
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
      const response = await axios.post("/api/feedback-form/", formData);
      setStatus("Form Submitted Successfully")
      onClose();
    } catch (error) {
      setStatus("An error occurred");
    } finally {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
      });
      setIsSubmitting(false);
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
          <div className="md:w-5/12 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
            <p className="text-gray-600 text-sm  mb-3 md:mb-6 text-center">
              You are one step away from your dream career. Fill in your contact
              details and our expert counsellors will reach out to you within 24
              hours.
            </p>

            {/* Flexbox for Logos */}
            <div className="hidden md:flex flex-wrap justify-center items-center gap-4">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                    className="w-full px-4 py-3 border-t border-b border-r border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                <input
                  id="course"
                  name="course"
                  type="text"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Course Interested In"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${isSubmitting ? "bg-gray-400" : "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
                    } text-white px-8 py-3 rounded-lg w-full mt-5 text-sm font-semibold shadow-md transform hover:scale-105 transition-transform duration-300`}
                >
                  {isSubmitting ? "Submitting..." : "Get Connected"}
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

export default Feedback;
