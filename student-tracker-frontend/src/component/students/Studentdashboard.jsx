import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Studentdashboard = () => {
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        // Fetch Homeworks
        const homeworksResponse = await axios.get(
          `http://localhost:8000/student/approved-homeworks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHomeworks(homeworksResponse.data.approvedHomeworks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHomeworks();
  }, []);
  console.log(homeworks);
  return (
    <div>
      {homeworks.length !== 0 ? (
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

                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {homeworks.map((item) => (
                <tr key={item.homeworkId}>
                  <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
                    {item.teacherName}
                  </td>

                  <td className="whitespace-nowrap  text-center px-4 py-2 text-gray-700">
                    {item.title}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2">
                    <NavLink
                      to={`../answer/${item.homeworkId}}`}
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
      )}
    </div>
  );
};

export default Studentdashboard;
