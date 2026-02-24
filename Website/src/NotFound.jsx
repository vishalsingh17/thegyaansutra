import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center text-white px-6 md:px-12">
        {/* <h1 className="text-6xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          404
        </h1> */}
        <p className="text-2xl lg:text-3xl mb-4 animate__animated animate__fadeIn animate__delay-2s">
          Oops! Page Not Found
        </p>
        <p className="text-lg lg:text-xl mb-6 animate__animated animate__fadeIn animate__delay-3s">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-white text-gray-800 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-4s"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
