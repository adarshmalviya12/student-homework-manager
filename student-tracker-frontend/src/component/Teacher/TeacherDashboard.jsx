import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../MyContext";
import axios from "axios";
import BASE_URL from "../../constants";

const TeacherDashboard = () => {
  const { user, homeworks, setHomeworks, answers, setAnswers } =
    useContext(MyContext);

  useEffect(() => {
    const fetchHomeworksAndAnswers = async () => {
      const userId = user._id;

      try {
        // Fetch Homeworks
        const homeworksResponse = await axios.get(
          `${BASE_URL}/teacher/fetch-homeworks/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHomeworks(homeworksResponse.data.homeworks);

        // Fetch Answers
        const answersResponse = await axios.get(
          `http://localhost:8000/teacher/fetch-answers/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAnswers(answersResponse.data.answersList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHomeworksAndAnswers();
  }, [user._id]);

  return <div className="p-4 ml-24 flex justify-around gap-6  "></div>;
};

export default TeacherDashboard;
