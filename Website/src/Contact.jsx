import React, { useState } from "react";
import img from "./assets/contact.png";
import axios from "axios";

const Contact = () => {
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
    <section
      id="contact-us"
      className="relative px-6 bg-white overflow-hidden py-12 lg:pt-24"
    >
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-200 rounded-full opacity-50 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-pink-200 rounded-full opacity-50 blur-[120px]"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Learn & Connect
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions about our courses or services? Fill out the form
            below, and we’ll get back to you!
          </p>
          <div className="mt-8 hidden lg:block">
            <img
              src={img}
              className="w-full h-auto max-w-lg mx-auto lg:ml-0"
              alt="Contact illustration"
            />
          </div>
        </div>

        <div className="w-full sm:w-11/12 md:w-10/12 lg:w-1/2 mt-5 lg:mt-0 bg-white shadow-2xl rounded-lg p-8 lg:p-12 lg:ml-12 relative">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-purple-600"
              >
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                maxLength={50}
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-purple-600"
              >
                Email
              </label>
              <input
                id="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your email address"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-purple-600"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-purple-600"
              >
                Course
              </label>
              <input
                id="course"
                name="course"
                type="text"
                value={formData.course}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Course Interested In"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? "bg-gray-400" : "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"
                  } text-white px-8 py-3 rounded-md w-full mt-5 text-sm font-semibold shadow-md transform hover:scale-105 transition-transform duration-300`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
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
    </section>
  );
};

export default Contact;
