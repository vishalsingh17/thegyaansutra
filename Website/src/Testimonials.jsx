import React, { useRef } from "react";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Avatar1 from "./assets/Sheena Dixit.jpeg";
import Avatar2 from "./assets/naincy verma.jpeg";
import Avatar3 from "./assets/Rohit Tomar.jpeg";
import Avatar4 from "./assets/sarvagya partap.jpeg";
import Avatar5 from "./assets/Hershika jain.jpeg";
import Avatar6 from "./assets/Ashish Garg.jpg";
import Avatar7 from "./assets/Jaydeep Dixit.jpeg";
import Avatar8 from "./assets/Sahil.jpg";
import Avatar9 from "./assets/Rajni.jpg";

function Testimonials() {
  const sliderRef = useRef(null);
  const testimonials = [
    {
      name: "Naincy Verma",
      role: "Quality Analyst",
      description:
        "Attention to detail and precision define my work. This program sharpened my analytical skills, ensuring I can detect even the smallest discrepancies in financial data.",
      avatar: Avatar2,
      linkedin: "https://www.linkedin.com/in/naincy-verma-05b5451ab/",
    },
    {
      name: "Hershika Jain",
      role: "Data Engineer",
      description:
        "Transforming raw data into meaningful insights is my passion. This program gave me the expertise to build efficient data pipelines tailored for the financial sector.",
      avatar: Avatar5,
      linkedin: "https://www.linkedin.com/in/hershika-jain-7a39a5164/",
    },
    {
      name: "Sarvagya Pratap",
      role: "Business Associate",
      description:
        "Understanding market trends and financial strategies is crucial in my role. This program equipped me with the skills to make data-driven business decisions.",
      avatar: Avatar4,
      linkedin: "https://www.linkedin.com/in/sarvagyapratap/",
    },
    {
      name: "Rohit Tomar",
      role: "Consultant",
      description:
        "Providing expert advice requires both technical knowledge and industry experience. This program gave me the confidence to help businesses navigate complex financial challenges.",
      avatar: Avatar3,
      linkedin: "https://www.linkedin.com/in/rohit-tomar-852671108/",
    },
    {
      name: "Jaydeep Dixit",
      role: "Data Scientist",
      description:
        "Data is the backbone of informed decision-making. With this program, I mastered the art of predictive modeling and risk assessment in financial services.",
      avatar: Avatar7,
      linkedin: "https://www.linkedin.com/in/jaydeepdixit/",
    },
    {
      name: "Sheena Bisht",
      role: "Software Developer",
      description:
        "Building secure and scalable applications is my forte. This program helped me understand financial systems, allowing me to develop efficient software solutions for the industry.",
      avatar: Avatar1,
      linkedin: "https://www.linkedin.com/in/sheena-bisht-445a5018b/",
    },
    {
      name: "Ashish Garg",
      role: "Data Scientist",
      description:
        "Numbers tell a story, and my job is to interpret them. Thanks to this program, I can now develop machine learning models that drive financial innovation.",
      avatar: Avatar6,
      linkedin: "https://www.linkedin.com/in/ashish-garg-7321461b3/",
    },
    {
      name: "Sahil Singh",
      role: "Marketing Expert",
      description:
        "In the world of finance, the right message makes all the difference. This program refined my strategic thinking, helping me craft impactful marketing campaigns.",
      avatar: Avatar8,
      linkedin: "https://www.linkedin.com/in/sahil-singh-70827a221/",
    },
    {
      name: "Rajni Rawat",
      role: "Software Developer",
      description:
        "Writing clean, efficient code for financial platforms requires deep industry understanding. This program provided me with the knowledge to build robust fintech applications.",
      avatar: Avatar9,
      linkedin: "https://www.linkedin.com/in/rajni-rawat-9a4864271/",
    },
  ];
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative">
      <section id="Blogs" className="flex flex-col px-7 py-10">
        <div className="text-center">
          <h2 className="text-4xl text-black font-bold">
            Success{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              Stories
            </span>
          </h2>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="py-12">
              <div className="flex flex-col items-center mx-auto bg-black py-3 w-72 rounded-t-lg shadow-md"></div>
              <div className="bg-white rounded-lg px-6 py-4 shadow-lg mx-auto w-72 h-64">
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium flex items-center">
                      {testimonial.name}
                      {testimonial.linkedin && (
                        <a
                          href={testimonial.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          <LinkedInIcon />
                        </a>
                      )}
                    </h3>
                    <p className="text-sm text-[#3534fe]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-4 h-32 text-sm">
                  {testimonial.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex justify-center space-x-10">
          <button
            className="p-2 bg-black text-white rounded-full shadow-md hover:bg-white hover:text-black"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <ArrowBackIosNewIcon />
          </button>
          <button
            className="p-2 bg-black text-white rounded-full shadow-md hover:bg-white hover:text-black"
            onClick={() => sliderRef.current.slickNext()}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
