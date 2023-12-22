import { Outlet } from "react-router-dom";
import DrawerTeacher from "../component/Teacher/DrawerTeacher";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";

const TeacherPage = () => {
  const { user, setUser } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    try {
      const response = await axios.get("http://localhost:8000/teacher/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
      // console.log("User data:", response.data);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-4 sm:ml-64 flex bg-violet-200 h-screen ">
          <DrawerTeacher />
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherPage;
