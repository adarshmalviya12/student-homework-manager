import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingCards = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-8">
      <h2 className="text-lg font-extrabold mb-6 text-center text-blue-600">
        “The only thing that overcomes hard luck is hard work.”– Harry Golden
      </h2>
      <p className="text-gray-700 mb-8 text-center">
        Choose your role to get started:
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate("/student/login")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline-blue transform transition-transform duration-300 ease-in-out"
        >
          Student
        </button>
        <button
          onClick={() => navigate("/admin/login")}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline-green transform transition-transform duration-300 ease-in-out"
        >
          Admin
        </button>
        <button
          onClick={() => navigate("/teacher/login")}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline-yellow transform transition-transform duration-300 ease-in-out"
        >
          Teacher
        </button>
      </div>
    </div>
  );
};
