import React from "react";
import GoogleAuth from "./authenication/Login";
import Lottie from "lottie-react";
import Learning from "./assets/logo.json";
import img from "./assets/Login.png";
import CloseIcon from '@mui/icons-material/Close';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="flex-[3] bg-purple-400 flex items-center justify-center relative p-4 md:p-8  shadow-sm">
        <div className="text-center text-white max-w-6xl">
          <img
            src={img}
            alt="Background Visual"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      <div className="flex-[1] flex flex-col items-center justify-start bg-white p-6 md:p-10">
        <a href="/">
          <div className="absolute top-2 right-2 scale-110 font-medium text-white md:bg-purple-500 bg-black py-1 px-2 rounded-md">Back</div>
        </a>
        <a href="/" className="flex items-center mb-4 md:mt-14">
          <Lottie
            animationData={Learning}
            loop
            autoplay
            className="h-12 w-12 mr-2"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-red-500 text-center">
            The Gyaan Sutra
          </h1>
        </a>

        <blockquote className="italic text-base md:text-lg text-gray-600 text-center mb-4">
          "Empower your learning journey with access to quality resources and
          mentorship."
        </blockquote>

        <div className="w-full flex justify-center mt-6 md:mt-10 mx-auto">
          <GoogleAuth />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            By signing in, you agree to our
            <a href="/TermsAndConditions" className="text-purple-600 hover:underline ml-1">
              Terms of Service &nbsp;
            </a>
            and
            <a href="/PrivacyPolicy" className="text-purple-600 hover:underline ml-1">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
