import axios from "axios";
import React, { useContext, useState } from "react";
import { MyContext } from "../../MyContext";
import BASE_URL from "../../constants";

const CreateHomework = () => {
  const [title, setTitle] = useState("");
  const { user, homeworks, setHomeworks } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/teacher/create-homework`,
        {
          title: title,
          createdBy: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Assuming the server responds with the created homework
      const newHomework = response.data;

      // Update the homeworks state with the new homework
      setHomeworks((prevHomeworks) => [
        ...prevHomeworks,
        {
          title: title,
          approvedByAdmin: newHomework.approvedByAdmin,
        },
      ]);

      // Clear the title input after successful submission
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-80 mx-auto mt-4 bg-gray-300 p-4 shadow-md rounded-lgs   ">
      <h2 className="text-2xl font-bold mb-4">Create Homework</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Homework
        </button>
      </form>
    </div>
  );
};

export default CreateHomework;
