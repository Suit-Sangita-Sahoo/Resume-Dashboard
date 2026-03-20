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

  // ❌ If no data
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        No Resume Data Found ❌
      </div>
    );
  }

  // 🎯 Calculate Resume Score
  const calculateScore = () => {
    let score = 0;

    if (user.teachername && user.teachername !== "Not Found") score += 15;
    if (user.email && user.email !== "Not Found") score += 15;
    if (user.phone && user.phone !== "Not Found") score += 15;
    if (user.Skill && user.Skill.length > 0) score += 20;
    if (user.qualification && user.qualification.length > 0) score += 20;
    if (user.project && user.project.length > 0) score += 15;

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

  // 🎨 Progress bar color
  const getColor = () => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const barColor = getColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">

      {/* 🔥 HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700">
          Resume Dashboard 🚀
        </h1>
        <p className="text-gray-600 mt-2">
          Your professional profile overview
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* 🎯 SCORE CARD */}
        <div className="bg-white p-6 rounded-3xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">
            Resume Strength 🎯
          </h2>

          <p className="text-3xl font-bold text-indigo-600">
            {score}/100
          </p>

          <p className="mt-2 text-lg font-semibold text-gray-700">
            {level}
          </p>

          {/* 📊 Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className={`${barColor} h-4 rounded-full transition-all duration-500`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        {/* 👤 PROFILE CARD */}
        <div className="bg-white p-6 rounded-3xl shadow-lg flex items-center gap-6">
          <div className="w-20 h-20 flex items-center justify-center bg-indigo-600 text-white text-2xl font-bold rounded-full">
            {user.teachername?.charAt(0) || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.teachername || "Not Found"}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        </div>

        {/* 💡 SKILLS */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">
            💡 Skills
          </h2>

          {user.Skill && user.Skill.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.Skill.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills found</p>
          )}
        </div>

        {/* 🎓 QUALIFICATIONS */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">
            🎓 Education
          </h2>

          {user.qualification && user.qualification.length > 0 ? (
            user.qualification.map((q, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-xl mb-3"
              >
                <p className="font-semibold text-gray-800">
                  {q.degree}
                </p>
                <p className="text-gray-600 text-sm">
                  {q.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No qualifications found</p>
          )}
        </div>

        {/* 🚀 PROJECTS */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">
            🚀 Projects
          </h2>

          {user.project && user.project.length > 0 ? (
            user.project.map((p, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-xl mb-3"
              >
                <p className="font-semibold text-gray-800">
                  {p.title}
                </p>
                <p className="text-gray-600 text-sm">
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
  );
};

export default Profile;