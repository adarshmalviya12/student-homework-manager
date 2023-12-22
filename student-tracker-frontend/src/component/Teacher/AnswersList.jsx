import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../MyContext";
import axios from "axios";

const AnswersList = () => {
  const { user, answers, setAnswers } = useContext(MyContext);
  console.log(answers);

  useEffect(() => {
    const fetchHomeworksAndAnswers = async () => {
      const userId = user._id;

      try {
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
  return answers.length !== 0 ? (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Student Name
            </th>

            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Question
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {answers.map((item) => (
            <tr key={item.answerId}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {item.studentName}
              </td>

              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {item.homeworkTitle}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {item.status}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <NavLink
                  to={`../answer/${item.answerId}}`}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <></>
  );
};

export default AnswersList;
