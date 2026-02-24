import React, { useState, useEffect } from 'react';

const WhatYouWillLearn = ({ course }) => {
  const [learn, setLearn] = useState([]);
  useEffect(() => {
    const learn = course.learn || [];
    setLearn(learn)
  },[course])

  return (
    <section id="outcomes" className="bg-gradient-to-b from-blue-100 to-purple-50 py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-purple-800">What you'll learn</h2>
        <div className="flex flex-wrap -mx-4">
          {learn.map((outcome, index) => (
            <div key={index} className="w-full md:w-1/2 px-4 mt-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✔</span>
                  <p className="text-gray-700">{outcome}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouWillLearn;
