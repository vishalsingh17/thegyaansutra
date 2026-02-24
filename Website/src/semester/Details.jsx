import React, { useEffect, useState } from "react";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import image from "../assets/image.png";

const Details = ({ course, isLoggedIn, isEnrolled }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [razorpay_order_id, setRazorpayOrderId] = useState("")
  const [enrollmentStatus, setEnrollmentStatus] = useState({});

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
    setSubjects(course?.subjects || []);
    if (isLoggedIn && course?.subjects) {
      checkEnrollmentStatus(course.subjects);
    }
  }, [course, isLoggedIn]);


  const toggleMODULE = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMouseOver = (index) => {
    setHoverIndex(index);
  };

  const handleMouseOut = () => {
    setHoverIndex(null);
  };

  const checkEnrollmentStatus = async (subjects) => {
    try {
      const subjectIds = subjects.map((subject) => subject.sub_id); // Extract subject IDs
      const formData = new FormData();
      subjectIds.forEach((id) => formData.append("subject_ids[]", id)); // Add all subject IDs

      const response = await axios.post("/api/issubjectenrolled/", formData, {
        withCredentials: true,
      });

      if (response.data) {
        const statusMap = response.data.reduce((acc, item) => {
          acc[item.sub_id] = item.enrolled; // Map sub_id to enrollment status
          return acc;
        }, {});
        setEnrollmentStatus(statusMap);
      }
    } catch (error) {
      console.error("Error fetching enrollment status");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, [])

  const handleSubmit = async (sub_id) => {
    if (isLoggedIn) {
      handleRazorpay(sub_id);
    }
    else {
      window.location.href = "/Login"
    }
  }

  const handleRazorpay = async (sub_id) => {
    try {
      const formData = new FormData();
      formData.append("Subject_Id", sub_id);
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
      console.error("Error initiating payment");
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

  if (!course) {
    return <div></div>;
  }

  return (
    <div id="curriculum" className="flex justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-100 to-purple-50 py-16">
      <div className="module-wrapper space-y-8 relative p-6 max-w-6xl w-full">
        {subjects.map((module, index) => (
          <div
            key={index}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            className="module-block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mx-auto w-full max-w-6xl"
          >
            <div
              className="module-top flex justify-between items-center py-4 px-6 bg-white cursor-pointer"
              onClick={() => toggleMODULE(index)}
            >
              <a href={`/video/${module.sub_id}/`} className="hover:underline">
                <h5 className="text-lg font-medium text-gray-800">
                  ({module.sub_id}) {module.name}
                </h5>
              </a>
              {enrollmentStatus[module.sub_id] ? (
                <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded">
                  Already Enrolled
                </button>
              ) : (
                <button
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-transform transform hover:scale-105"
                  onClick={() => handleSubmit(module.sub_id)}
                >
                  Enroll Now @ {module.price}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
