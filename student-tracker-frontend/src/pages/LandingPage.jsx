import React, { useEffect } from "react";
import { LandingCards } from "../component/LandingCards";

const LandingPage = () => {
  useEffect(() => {
    localStorage.setItem("token", null);
  }, []);
  return (
    <div
      className="bg-cover bg-center flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          "url('https://d3nn873nee648n.cloudfront.net/1200x1800-new/17665/SM786641.jpg')",
      }}
    >
      <div className="text-gray-700 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to Student Homework Tracker
        </h1>

        <LandingCards />
      </div>
    </div>
  );
};

export default LandingPage;
