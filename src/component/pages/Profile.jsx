import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("current_user");

    if (storedData) {
      try {
        setUser(JSON.parse(storedData));
      } catch (err) {
        console.error("Error parsing data:", err);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-lg sm:text-xl font-semibold">
        No Resume Data Found ❌
      </div>
    );
  }

  // 🎯 Score
  const calculateScore = () => {
    let score = 0;
    if (user.teachername && user.teachername !== "Not Found") score += 15;
    if (user.email && user.email !== "Not Found") score += 15;
    if (user.phone && user.phone !== "Not Found") score += 15;
    if (user.Skill?.length > 0) score += 20;
    if (user.qualification?.length > 0) score += 20;
    if (user.project?.length > 0) score += 15;
    return score;
  };

  const score = calculateScore();

  // 🏆 Level
  const getLevel = () => {
    if (score >= 80) return "Professional 🚀";
    if (score >= 50) return "Intermediate ⚡";
    return "Beginner 🌱";
  };

  const level = getLevel();

  // 🎨 Bar Color
  const getColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const barColor = getColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-10 py-6">

      {/* 🔥 HEADER */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-indigo-700">
          Resume Dashboard 🚀
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Your professional profile overview
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

        {/* 🎯 SCORE */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-indigo-700">
            Resume Strength 🎯
          </h2>

          <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-2">
            {score}/100
          </p>

          <p className="mt-1 text-sm sm:text-lg font-semibold text-gray-700">
            {level}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mt-4">
            <div
              className={`${barColor} h-3 sm:h-4 rounded-full transition-all duration-500`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        {/* 👤 PROFILE */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-indigo-600 text-white text-xl sm:text-2xl font-bold rounded-full">
            {user.teachername?.charAt(0) || "U"}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {user.teachername || "Not Found"}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
            <p className="text-gray-600 text-sm sm:text-base">{user.phone}</p>
          </div>
        </div>

        {/* 📦 GRID SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 💡 SKILLS */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-700">
              💡 Skills
            </h2>

            {user.Skill?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.Skill.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills found</p>
            )}
          </div>

          {/* 🎓 EDUCATION */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-700">
              🎓 Education
            </h2>

            {user.qualification?.length > 0 ? (
              user.qualification.map((q, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {q.degree}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {q.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No qualifications found</p>
            )}
          </div>

          {/* 🚀 PROJECTS */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg md:col-span-2">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-700">
              🚀 Projects
            </h2>

            {user.project?.length > 0 ? (
              user.project.map((p, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {p.title}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {p.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No projects found</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;