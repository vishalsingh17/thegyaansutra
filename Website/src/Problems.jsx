import React from "react";
import Slider from "react-slick";

const Problems = () => {
  const companies = [
    { name: "Learning in isolation", emoji: "😔" },
    { name: "No practical/hands-on experience", emoji: "😩" },
    { name: "No peer support", emoji: "😞" },
    { name: "Difficult to retain what was taught", emoji: "☹️" },
    { name: "Hard to get across the finish line", emoji: "😣" },
    { name: "No personal guidance and mentorship", emoji: "😭" },
    { name: "Outdated curriculum", emoji: "😖" },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="relative h-fit">
      <div className="py-12 md:py-16 relative z-10">
        <h2 className="text-center text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 pb-12 z-10">
          Learning{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
            problems
          </span>{" "}
          we've all faced
        </h2>
        <div className="absolute md:top-0 sm:top-12 left-0  w-52 h-52  bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-full opacity-50 blur-2xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-full opacity-50 blur-2xl z-0"></div>

        <div
          className="lg:hidden"
          style={{ padding: "20px", textAlign: "center", margin: "20px" }}
        >
          <Slider {...settings}>
            {companies.map((company, index) => (
              <div key={index} style={{ padding: "20px" }}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    // padding: '20px',
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "8px 24px",
                  }}
                  className="w-fit"
                >
                  <span className="rounded-full p-2 bg-slate-200 mr-5">
                    {company.emoji}
                  </span>{" "}
                  <span>{company.name}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="hidden lg:block mx-auto space-y-4">
          <div className="gap-4 w-fit mx-auto flex">
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">😔</span>
              <span className="text-base">Learning in isolation</span>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">😟</span>
              <span className="text-base">
                No practical/hands-on experience
              </span>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">😕</span>
              <span className="text-base">No peer support</span>
            </div>
          </div>
          <div className="gap-4 w-fit mx-auto flex">
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">😞</span>
              <span className="text-base">
                Difficult to retain what was taught
              </span>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">😤</span>
              <span className="text-base">
                Hard to get accross the finish line
              </span>
            </div>
          </div>
          <div className="gap-4 w-fit mx-auto flex">
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">😢</span>
              <span className="text-base">
                No personal guidance and mentorship
              </span>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">😫</span>
              <span className="text-base">Outdated curriculum</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
