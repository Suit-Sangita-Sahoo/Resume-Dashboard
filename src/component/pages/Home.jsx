import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // ✅ Check login
  const isLoggedIn = () => {
    const user = localStorage.getItem("current_user");
    return user ? true : false;
  };

  // ✅ Handle Upload Click
  const handleUploadClick = () => {
    if (isLoggedIn()) {
      navigate("/upload");
    } else {
      alert("Please login first!");
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔹 Navbar */}
      <nav className="flex justify-between items-center px-6 sm:px-10 py-4 bg-white shadow">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
          ResumeAnalyzer
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </nav>

      {/* 🔹 Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-16 sm:mt-20 px-4">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 leading-tight">
          Analyze Your Resume <br />
          <span className="text-blue-600">Get Job-Ready 🚀</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg max-w-2xl">
          Upload your resume and get instant feedback on your skills,
          missing keywords, and job recommendations.
        </p>

        <button
          onClick={handleUploadClick}
          className="mt-6 sm:mt-8 bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition"
        >
          Upload Resume
        </button>
      </div>

      {/* 🔹 Features Section */}
      <div className="mt-16 sm:mt-24 px-6 sm:px-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">
              📄 Resume Analysis
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Get detailed insights and score of your resume instantly.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">
              🧠 Skill Detection
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Identify your strengths and missing skills.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">
              💼 Job Suggestions
            </h3>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Get job recommendations based on your skills.
            </p>
          </div>

        </div>
      </div>

      {/* 🔹 Footer */}
      <div className="mt-16 sm:mt-20 bg-blue-700 text-white text-center py-4">
        <p className="text-sm sm:text-base">
          © 2026 ResumeAnalyzer | Built with ❤️ using React
        </p>
      </div>

    </div>
  );
};

export default Home;