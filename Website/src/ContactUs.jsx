import React from 'react';
import { InlineWidget } from 'react-calendly';
import Lottie from 'lottie-react';
import logo from "./assets/book.json";

const ContactSection = () => {
  return (
    <div className="relative flex flex-col items-center bg-white p-6 sm:p-12 overflow-hidden" id="Calendly">
      {/* Decorative Gradient Balls */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-3xl opacity-30"></div>

      {/* Additional Decorative SVGs */}
      <svg className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f3a8d1', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#74a8f0', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      <svg className="absolute top-24 left-12 transform -translate-x-1/2 opacity-15" width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="100,10 40,190 190,60 10,60 160,190" fill="rgba(234, 72, 128, 0.7)" />
      </svg>

      <svg className="absolute bottom-24 right-32 opacity-25" width="250" height="250" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="100" rx="80" ry="120" fill="url(#grad2)" />
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6a4cff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ff4d6d', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>

      <svg className="absolute top-28 right-12 transform -translate-y-1/2 opacity-30" width="180" height="180" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#D4B5FF" d="M40.3,-59.6C51.8,-51.2,57.1,-34.5,56.7,-19.6C56.4,-4.7,50.3,8.2,44.6,21.5C39,34.9,33.8,48.8,23.7,55.6C13.7,62.4,-1.2,62,-12.9,55.6C-24.6,49.2,-33.1,36.7,-43.6,26.5C-54.1,16.3,-66.6,8.1,-67.6,-0.5C-68.6,-9.1,-58.1,-18.3,-48.4,-26.3C-38.6,-34.2,-29.6,-41,-18.7,-48.6C-7.7,-56.2,5.2,-64.6,20.7,-67.4C36.2,-70.2,53.2,-67.6,40.3,-59.6Z" transform="translate(100 100)" />
      </svg>

      <svg className="absolute bottom-12 left-24 transform -translate-x-1/2 opacity-100" width="220" height="220" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#f0f8ff" d="M82.3,-96.6C106.6,-82.3,124.6,-62.5,131.1,-40.5C137.7,-18.6,132.8,5.7,120.5,26.2C108.2,46.6,88.5,62.2,66.4,72.3C44.3,82.5,19.9,87,0.5,78.8C-19,70.7,-38,49,-58.1,32.9C-78.2,16.9,-99.3,-1.1,-99.4,-19.6C-99.5,-38,-78.6,-57,-59.1,-73.1C-39.7,-89.1,-19.8,-102.2,0.7,-100.4C21.2,-98.5,42.4,-82.6,61.6,-62.4C80.8,-42.3,98.9,-18,82.3,-96.6Z" transform="translate(100 100)" />
      </svg>

      <svg className="absolute top-28 right-8 opacity-30" width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="50" fill="rgba(58, 123, 213, 0.6)" />
      </svg>

      {/* Main Content */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center relative z-10">
        Book Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500">
          1:1 Consultation
        </span>
      </h2>
      <p className="text-gray-700 text-lg text-center mb-8 relative z-10">
        Get personalized guidance and support from experienced mentors. Book
        your one-on-one session now and take a step closer to achieving your
        goals!
      </p>

      <div className="hidden lg:flex justify-center items-center w-full p-6 relative z-10">
        <InlineWidget
          url="https://calendly.com/thegyaansutra/career_consultation"
          styles={{
            width: '100%',
            height: '800px',
          }}
          className="custom-scrollbar"
        />
      </div>

      <div className="lg:hidden flex flex-col w-full max-w-md sm:w-96 bg-[#f3f4ff] overflow-hidden shadow-lg rounded-lg p-6 relative z-10">
        <InlineWidget
          url="https://calendly.com/thegyaansutra/career_consultation?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f3f4ff"
          styles={{ minWidth: '100%', height: '420px' }}
          className="custom-scrollbar"
        />
      </div>
    </div>
  );
};

export default ContactSection;
