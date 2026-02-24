import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How does the platform help with university courses?",
      answer:
        "Our platform provides comprehensive study materials, practice tests, and expert guidance aligned with university curriculum to help you excel in your academic journey.",
    },
    {
      question: "What kind of job-oriented skills can I learn?",
      answer:
        "We offer courses in high-demand areas like Data Science, Digital Marketing, Software Development, and more—all designed with input from industry leaders.",
    },
    {
      question: "How flexible is the learning schedule?",
      answer:
        "You can access all materials 24/7 and learn at your own pace. Our mobile-optimized platform allows you to study whenever you want.",
    },
    {
      question: "What is the job placement success rate?",
      answer:
        "We maintain a 65% success rate in job placements for our career-oriented programs, with dedicated career support and industry connections.",
    },
  ];

  return (
    <div id="FAQ" className="relative section bg-white  mx-auto py-16 overflow-hidden">
      <div className="absolute top-0 left-10 w-40 h-40 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-20 w-60 h-60 bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-300 to-indigo-300 opacity-10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              Questions
            </span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="faq-wrapper space-y-8 relative">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="faq-block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="faq-top flex justify-between items-center py-4 px-6 bg-white cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h5 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h5>
                <ExpandMoreIcon
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
              <Collapse in={activeIndex === index}>
                <div className="faq-bottom p-6 bg-gradient-to-r from-purple-50 to-blue-50 text-left">
                  <p className="faq-answer text-gray-600">{faq.answer}</p>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
