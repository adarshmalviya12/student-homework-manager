import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 p-2 sticky z-50 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/">
          <div className="flex items-center">
            <img
              className="w-36 h-14"
              src="https://gradxacademy.in/wp-content/uploads/2022/12/GradX-Logo-for-Black-1536x768.png"
              alt="GradX Academy Logo"
            />
            <h1 className="text-lime-400 ml-4 text-2xl">MarQuery Tech</h1>
          </div>
        </NavLink>

        {user && (
          <div className="flex items-center gap-2">
            <p id="welcome-message" className="text-lime-400">
              Welcome, {user?.username}!
            </p>
            <button
              onClick={() => {
                localStorage.setItem("token", null);
                setUser(null);
                navigate("/");
              }}
              className="bg-white text-lg text-blue-500 px-2 py-0.5 rounded-md hover:bg-blue-300 focus:outline-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
