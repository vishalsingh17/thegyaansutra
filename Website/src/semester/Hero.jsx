import React, { useEffect, useState } from "react";
import { User, Mail, Phone, BookOpenIcon } from "lucide-react";
import axios from "axios";
import Lottie from "lottie-react";
import logo from "../assets/logo.json";
import image from "../assets/image.png";

const Hero = ({ course, isLoggedIn, isEnrolled }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [razorpay_order_id, setRazorpayOrderId] = useState("")

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
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, [])

  const handleSubmit = async () => {
    if (isLoggedIn) {
      handleRazorpay();
    }
    else {
      window.location.href = "/Login"
    }
  }
  const handleRazorpay = async () => {
    try {
      const formData = new FormData();
      formData.append("Course_Id", course.course);
      formData.append("Semester_Num", course.num);
      const response = await axios.post("/api/orderfetch", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        setRazorpayOrderId(response.data.razorpay_order_id);
        if (response.data.contact == null) {
          initiatePayment(
            response.data.razorpay_order_id,
            response.data.Razorpay_Key,
            response.data.price,
            response.data.subject_ids,
            response.data.user,
          );
        }
        else {
          initiatePayment(
            response.data.razorpay_order_id,
            response.data.Razorpay_Key,
            response.data.price,
            response.data.subject_ids,
            response.data.user,
            response.data.contact,
          );
        }
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  }

  const initiatePayment = async (
    razorpay_order_id,
    Razorpay_Key,
    price,
    subject_ids,
    user,
    contact
  ) => {
    const options = {
      key: Razorpay_Key,
      amount: price * 100,
      currency: "INR",
      order_id: razorpay_order_id,
      name: "The Gyaan Sutra",
      image: image,
      description: "Payment for Printing Services",
      handler: function (response) {
        const formData = new FormData();
        formData.append("subject_ids", subject_ids);

        const jsonData = JSON.stringify({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
        formData.append("jsonData", jsonData);

        axios.post("/api/payment_success", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            window.location.href = response.data.redirect
          })
          .catch((error) => {
            console.error(error);
          })
      },
      prefill: {
        contact: contact,
        email: user,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleform = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course.trim()
    ) {
      setResponseMessage("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("/api/feedback-form/", formData);
      setResponseMessage("Form Submitted Successfully")
    } catch (error) {
      setResponseMessage("An error occurred");
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

  if (!course) {
    return <div></div>;
  }
  return (
    <div className="relative bg-gradient-to-b from-blue-100 to-purple-50 flex flex-col items-center justify-center px-4 pb-40 pt-28">
      {/* Gradient Balls */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-purple-400 via-purple-300 to-pink-300 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-300 rounded-full opacity-50 blur-3xl"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
        {/* Left Section */}
        <div className="flex-1 rounded-lg p-2 w-full">
          <h2 className="text-5xl font-bold text-purple-900 mb-4 text-center lg:text-left">
            {course.semester}
          </h2>
          <p className="text-gray-700 text-lg py-6 text-center lg:text-left">
            {course.description}
          </p>
          <div className="flex justify-center lg:justify-start">
            {!isEnrolled ? (
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-transform transform hover:scale-105" onClick={handleSubmit}>
                Enroll Now @ {course.price}
              </button>
            ) :
              (
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded">Already Enrolled</button>
              )
            }
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm flex-1 relative">
          <h1 className="text-center text-xl font-semibold py-4 text-purple-900">
            Book a Free Live Consultation
          </h1>
          <form onSubmit={handleform}>
            {[
              { placeholder: "Name", name: "fullName", icon: User, type: "text" },
              { placeholder: "Email", name: "email", icon: Mail, type: "email" },
              { placeholder: "Phone", name: "phone", icon: Phone, type: "text" },
              { placeholder: "Course Interested In", name: "course", icon: BookOpenIcon, type: "text" },
            ].map((field, idx) => (
              <div key={idx} className="relative mt-5">
                <field.icon
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600"
                  aria-hidden="true"
                />
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="p-3 pl-12 bg-purple-50 w-full rounded-lg text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  style={{ textIndent: "4px" }}
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${isSubmitting ? "bg-gray-400" : "bg-purple-700 hover:bg-purple-600"
                } text-white px-8 py-3 rounded-full w-full mt-5 text-sm font-semibold shadow-md transform hover:scale-105 transition-transform duration-300`}
            >
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>
          </form>
          {responseMessage && (
            <p className="text-center text-sm text-purple-700 mt-4">{responseMessage}</p>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 mt-12 lg:mt-[47rem] lg:absolute bg-white shadow-lg p-6 rounded-lg max-w-7xl z-10 ">
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h3 className="text-lg font-bold text-purple-900">{course.time_need}+ Hours</h3>
        </div>
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h3 className="text-lg font-bold text-purple-900">{course.review} <span className="text-yellow-400">★</span></h3>
        </div>
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h3 className="text-lg font-bold text-purple-900">{course.level
            ? course.level.charAt(0).toUpperCase() + course.level.slice(1).toLowerCase()
            : "Loading level..."} level</h3>
        </div>
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h3 className="text-lg font-bold text-purple-900">{course.type}</h3>
        </div>
        <div className="flex-1 text-center min-w-[150px] max-w-[200px]">
          <h3 className="text-lg font-bold text-purple-900">{course.course_type.charAt(0).toUpperCase() + course.course_type.slice(1).toLowerCase()} Oriented Course</h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;
