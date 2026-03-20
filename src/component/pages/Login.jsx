import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/upload");
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      navigate("/upload");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 w-[380px]">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="📧 Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        
        <div className="mb-6">
          <input
            type="password"
            placeholder="🔒 Enter your password"
            className="w-full px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-gray-200 transition duration-300"
        >
          Login 🚀
        </button>

        {/* Footer */}
        <p className="text-center mt-5 text-white text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold underline hover:text-gray-200"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;