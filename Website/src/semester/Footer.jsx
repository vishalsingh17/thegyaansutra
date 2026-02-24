import React from "react";
import {
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.json";
import Lottie from "lottie-react";
import Msme from '../assets/MSME.png';
import startup from "../assets/Startupindia.png";

const Footer = () => {
  return (
    <footer className="bg-[#fafafa] text-gray-500 py-2">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col space-y-4 w-full lg:w-1/3 p-4">
        <a href="/" className="flex items-center space-x-2">
            <div
              className="lottie-container"
              style={{
                transform: "scale(1.5)",
                transformOrigin: "center",
              }}
            >
              <Lottie
                animationData={logo}
                loop={true}
                autoplay={true}
                style={{ height: "48px", width: "55px" }}
              />
            </div>
            <span className="text-lg font-bold text-red-500">
              The Gyaan Sutra
            </span>
          </a>
          <p className="flex items-center space-x-2">
            <FaEnvelope />
            <a
              href="mailto:support@thegyaansutra.com"
              className="hover:text-[#4d4dff]"
            >
              support@thegyaansutra.com
            </a>
          </p>
          <p className="flex items-center space-x-2">
            <FaPhoneAlt />
            <a href="tel:+916361388292" className="hover:text-[#4d4dff]">
              +91 8882199625
            </a>
          </p>
          <p className="flex items-center space-x-2">
            <FaMapMarkerAlt />
            <span className="hover:text-[#4d4dff]">Janakpuri, New Delhi</span>
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/company/the-gyaan-sutra/"
              className="text-gray-500 hover:text-[#0077b5]"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.youtube.com/@thegyaansutra-tgs"
              className="text-gray-500 hover:text-[#cd201f]"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://www.instagram.com/thegyaansutra/"
              className="text-gray-500 hover:text-[#e4405f]"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/people/The-Gyaan-Sutra/61567869852243/"
              className="text-gray-500 hover:text-[#3b5999]"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://x.com/thegyaansutra"
              className="text-gray-500 hover:text-black"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col space-y-4 w-full lg:w-2/3 p-4">
          <div className="flex items-center space-x-4">
            <img src={Msme} alt="MSME" className="h-12 w-auto" />
            <img src={startup} alt="Startup india" className="h-12 w-auto" />
          </div>
          <div className="border-t-2 border-black w-60 "></div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col space-y-2">
              <a href="#outcomes" className="hover:text-[#4d4dff]">
              Outcomes
              </a>
              <a href="#curriculum" className="hover:text-[#4d4dff]">
              Curriculum
              </a>
              <a href="/" className="hover:text-[#4d4dff]">
                Home
              </a>
            </div>
            <div className="flex flex-col space-y-2 mt-4 md:mt-0">
              <a href="/PrivacyPolicy" className="hover:text-[#4d4dff]">
                Privacy Policy
              </a>
              <a href="/RefundPolicy" className="hover:text-[#4d4dff]">
                Refund Policy
              </a>
              <a href="/TermsAndConditions" className="hover:text-[#4d4dff]">
                Terms and condition
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center font-medium"><a href="https://techplx.in">&copy; 2025, Made By Techplx. All Right Reserved</a></div>
    </footer>
  );
};

export default Footer;
