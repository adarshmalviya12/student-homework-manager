import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleAnswerStudent = () => {
  const [answer, setAnswer] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { homeworkId } = useParams();
  const cleanHomeworkId = homeworkId.replace(/[{}]/g, "");

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/student/single-homework/${cleanHomeworkId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAnswer(response.data.singleHomework);
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };
    fetchAnswer();
  }, [cleanHomeworkId]);

  const handleSubmit = async () => {
    try {
      // Send a POST request to submit the answer
      const response = await axios.post(
        `http://localhost:8000/student/answer-homework/${cleanHomeworkId}`,
        { answerText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the local state with the submitted answer
      setAnswer(response.data.singleHomework);

      // Reset the answer text after submission
      setAnswerText("");

      // Set success message
      setSuccessMessage("Answer submitted successfully!");
    } catch (error) {
      console.error("Error submitting answer:", error);
      // Handle error and set an error message if needed
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{answer?.title}</h1>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          {successMessage}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
        <textarea
          id="OrderNotes"
          className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
          rows="4"
          placeholder="Enter your answer here..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        ></textarea>

        <div className="flex items-center justify-end gap-2 bg-white p-3">
          <button
            type="button"
            className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleAnswerStudent;
