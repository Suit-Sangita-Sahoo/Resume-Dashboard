import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // You can add API or localStorage logic here
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 w-[380px]">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account ✨
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="👤 Full Name"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="📧 Email Address"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="🔒 Password"
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full py-3 rounded-xl bg-white text-purple-600 font-bold hover:bg-gray-200 transition duration-300"
        >
          Register 🚀
        </button>

        {/* Footer */}
        <p className="text-center mt-5 text-white text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold underline cursor-pointer hover:text-gray-200"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;