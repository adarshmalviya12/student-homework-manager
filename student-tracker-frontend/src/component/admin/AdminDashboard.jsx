import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../MyContext";
import axios from "axios";
import BASE_URL from "../../constants";

const AdminDashboard = () => {
  const [homeworks, setHomeworks] = useState([]);
  const { user } = useContext(MyContext);
  const updateStatus = async (homeworkId, approvedStatus) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/approve-homework/${homeworkId}`,
        { approvedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setHomeworks((prevHomeworks) =>
        prevHomeworks.map((homework) =>
          homework.homeworkId === homeworkId
            ? { ...homework, approvedStatus }
            : homework
        )
      );
    } catch (error) {
      console.error("Error updating homework status:", error);
    }
  };

  useEffect(() => {
    const homeworks = async () => {
      try {
        // Fetch Homeworks
        const homeworksResponse = await axios.get(
          `${BASE_URL}/admin/homeworks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHomeworks(homeworksResponse.data.homeworks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    homeworks();
  }, []);
  return (
    <div className="overflow-x-auto mt-8 ">
      {console.log(homeworks)}
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Created By Teacher
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Homework Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              update status
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {homeworks.map((homework) => (
            <tr key={homework.homeworkId} className="text-center">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {homework.createdBy}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {homework.title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {homework.approvedStatus == true ? (
                  <span className="text-green-500 font-bold">Approved</span>
                ) : (
                  <span className="text-red-500 font-bold">Not Approved</span>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(homework.homeworkId, true)}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(homework.homeworkId, false)}
                    className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
