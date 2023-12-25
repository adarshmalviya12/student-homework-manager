import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../constants";

const SingleAnswer = () => {
  const [answer, setAnswer] = useState(null);
  const { answerId } = useParams();
  const cleanAnswerId = answerId.replace(/[{}]/g, "");

  const handleStatus = async (status) => {
    try {
      await axios.put(
        `${BASE_URL}/teacher/update-answer-status/${cleanAnswerId}`,
        { newStatus: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update the local state after successful API call
      setAnswer((prevAnswer) => ({ ...prevAnswer, status }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    const fetchAnswer = async () => {
      const response = await axios.get(
        `${BASE_URL}/teacher/fetch-answer/${cleanAnswerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAnswer(response.data);
    };
    fetchAnswer();
  }, []);

  return (
    <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6">
      <div href="#">
        <span className="text-black font-bold"> Question : </span>
        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
          {answer?.homeworkTitle}
        </h3>
      </div>

      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        <span className="text-black font-bold"> Submitted by : </span>
        {answer?.studentName}
      </p>
      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        <span className="text-black font-bold">Answer : </span>{" "}
        {answer?.answerText}
      </p>
      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        <span className="text-black font-bold">Status : </span> {answer?.status}
      </p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => handleStatus("Rejected")}
          className="inline-block rounded border border-indigo-600 bg-red-600 px-8 py-1 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          Reject
        </button>

        <button
          onClick={() => handleStatus("Approved")}
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-1 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          Approve
        </button>
      </div>
    </article>
  );
};

export default SingleAnswer;
