import React, { useContext, useEffect, useState } from "react";
//import { AuthContext } from "../../CreateContext/GlobalContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { current_user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(current_user);

  useEffect(() => {
    if (!user) {
      const stored = JSON.parse(localStorage.getItem("current_user"));
      if (stored) setUser(stored);
    }
  }, [user]);

  if (!user) {
    return <div className="p-10 text-center">No user found</div>;
  }

  const skillsCount = user.Skill?.length || 0;
  const projectCount = user.project?.length || 0;
  const qualificationCount = user.qualification?.length || 0;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome, {user.teachername} 👋
        </h1>
        <p className="opacity-90">Manage your portfolio easily</p>
      </div>

      {/* Content */}
      <div className="p-8">

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Skills</h2>
            <p className="text-3xl font-bold text-indigo-600">{skillsCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Projects</h2>
            <p className="text-3xl font-bold text-purple-600">{projectCount}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500">Qualifications</h2>
            <p className="text-3xl font-bold text-pink-600">{qualificationCount}</p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Profile Actions</h2>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View Profile 👤
              </button>

              <button
                onClick={() => navigate("/edit-profile")}
                className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Edit Profile ✏️
              </button>

              <button
                onClick={() => navigate("/resume")}
                className="bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
              >
                View Resume 📄
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>

            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Age:</span> {user.age}</p>
            <p><span className="font-medium">Phone:</span> {user.phone || "N/A"}</p>

            <div className="mt-4">
              <button
                onClick={() => navigate("/profile")}
                className="text-indigo-600 font-semibold hover:underline"
              >
                View Full Profile →
              </button>
            </div>
          </div>

        </div>

        {/* Motivation Card */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">🚀 Keep Growing!</h2>
          <p>
            Add more skills, projects, and qualifications to make your portfolio stronger and stand out to recruiters.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;