import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuth = () => {
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
    axios.post("/api/cookiecheck/", null, {
      withCredentials: true,
    })
      .then(response => {
        if (response.status === 200) {
          window.location.href = "/dashboard/enrolledcourses";
        }
      })
    setLoading(false)

  }, []);

  const handleLogin = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    const data = new URLSearchParams();
    data.append("token", credential);

    try {
      const response = await axios.post("/api/google-login/", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message, {
          className: " text-green-500 font-bold text-sm",
          bodyClassName: "text-white",
          progressClassName: "bg-white",
          onClose: () => {
            window.location.href = "/dashboard/enrolledcourses";
          },
        });
      } else {
        toast.error(response.data.message || "Authentication failed", {
          className: "bg-red-500 text-white font-bold text-sm",
          bodyClassName: "text-white",
          progressClassName: "bg-white",
        });
      }
    } catch (error) {
      toast.error("Error during authentication. Please try again.", {
        className: "text-red-500 font-bold text-sm",
        bodyClassName: "text-white",
        progressClassName: "bg-white",
      });
    }
  };

  const handleFailure = () => {
    toast.error("Google Login Failed. Please try again.", {
      className: " text-red-500 font-bold text-sm",
      bodyClassName: "text-white",
      progressClassName: "bg-white",
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally show a spinner or loading message
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-full max-w-48">
        <GoogleLogin
          theme="filled_black"
          type="standard"
          onSuccess={handleLogin}
          onError={handleFailure}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
