import React from "react";

const SkillsGapSection = () => {
  return (
    <div className="relative bg-white text-black py-16 px-8 overflow-hidden">
      <div className="absolute top-[-50px] left-[-100px] w-[200px] h-[200px] bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 rounded-full blur-2xl"></div>
      <div className="absolute top-[20%] right-[-50px] w-[150px] h-[150px] bg-gradient-to-r from-blue-300 to-purple-300 opacity-30 rounded-full blur-xl"></div>
      <div className="absolute bottom-[-50px] left-[10%] w-[250px] h-[250px] bg-gradient-to-r from-indigo-400 to-blue-500 opacity-25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[10%] right-[-80px] w-[300px] h-[300px] bg-gradient-to-r from-pink-400 to-red-500 opacity-20 rounded-full blur-3xl"></div>

      <svg
        className="absolute top-[15%] left-[5%] w-[80px] h-[80px] text-blue-500 opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 00-6.36 17.64A1 1 0 006 21l3.25-1.4a6.94 6.94 0 004.5 0L18 21a1 1 0 00.36-1.36A10 10 0 0012 2zM12 4a8 8 0 016.32 12.9l-.64-.36-4.25 2.56A8.07 8.07 0 0112 4zM9 14a2 2 0 11-2-2 2 2 0 012 2z" />
      </svg>

      <svg
        className="absolute bottom-[15%] right-[10%] w-[100px] h-[100px] text-yellow-400 opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a7 7 0 017 7c0 3.08-1.23 4.75-3.09 6.15A2.86 2.86 0 0015 18h-6a2.86 2.86 0 00-.91-2.85C6.23 13.75 5 12.08 5 9a7 7 0 017-7zm1 19h-2v2h2z" />
      </svg>

      <svg
        className="absolute top-[10%] right-[15%] w-[60px] h-[60px] text-purple-300 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M21 4H7a3 3 0 00-3 3v12a1 1 0 001 1h12a1 1 0 001-1V4zM7 18V7a1 1 0 011-1h12v12z" />
      </svg>

      <svg
        className="absolute bottom-[20%] left-[8%] w-[90px] h-[90px] text-indigo-400 opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 4a2 2 0 012 2v2h4v2h-4v4h4v2h-4v2a2 2 0 01-4 0v-2H8v-2h4v-4H8V8h4V6a2 2 0 012-2z" />
      </svg>

      <h1 className="text-center text-3xl md:text-5xl font-bold mb-6">
        Did You{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
          Know!?
        </span>{" "}
        🚀
      </h1>
      <h4 className="text-center text-lg md:text-2xl font-semibold mb-12">
        🌟 <span className="font-bold">75%</span> of employers report critical
        skills gaps. <br />
        Don't let your career suffer! 💼
      </h4>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 relative z-10">
        <div className="bg-[#f9f9ff] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-6 text-center max-w-xs">
          <div className="text-6xl mb-4 animate-bounce">😰</div>
          <h5 className="text-xl font-bold">Struggling to balance</h5>
          <p className="mt-2 text-sm">
            📚 University coursework feels overwhelming.
          </p>
          <div className="mt-4 text-2xl text-[#3534fe] animate-pulse">➔</div>
        </div>

        <div className="bg-[#f9f9ff] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-6 text-center max-w-xs">
          <div className="text-6xl mb-4 animate-bounce delay-150">😟</div>
          <h5 className="text-xl font-bold">Unprepared for Jobs</h5>
          <p className="mt-2 text-sm">
            💼 The job market feels like a different world.
          </p>
          <div className="mt-4 text-2xl text-[#3534fe] animate-pulse">➔</div>
        </div>

        <div className="bg-[#f9f9ff] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-6 text-center max-w-xs">
          <div className="text-6xl mb-4 animate-bounce delay-300">😥</div>
          <h5 className="text-xl font-bold">Missing Practical Skills</h5>
          <p className="mt-2 text-sm">
            🔧 Formal education isn't enough to fill the gaps.
          </p>
          <div className="mt-4 text-2xl text-[#3534fe] animate-pulse">➔</div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGapSection;
