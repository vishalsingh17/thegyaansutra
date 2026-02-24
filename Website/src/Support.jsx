import React from "react";

const Support = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Support
        </h2>
        <p className="mb-4 text-sm sm:text-base md:text-lg">
          For support, you can email us at:{" "}
          <a
            href="mailto:support@thegyaansutra.com"
            className="text-blue-600 underline hover:text-blue-800"
          >
            support@thegyaansutra.com
          </a>
        </p>
        <p className="text-sm sm:text-base md:text-lg">
          <span className="font-medium">Live chat</span> support is available
          via <span className="font-medium">Tawk.to</span> at the bottom right
          of this page.
        </p>
      </div>
    </div>
  );
};

export default Support;
