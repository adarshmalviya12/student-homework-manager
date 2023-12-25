import React, { useContext, useEffect } from "react";
import { MyContext } from "../../MyContext";
import axios from "axios";
import BASE_URL from "../../constants";

const HomeworksComponent = () => {
  const { user, homeworks, setHomeworks } = useContext(MyContext);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHomeworksAndAnswers();
  }, [user._id]);
  return (
    <div>
      {homeworks.length !== 0 ? (
        <div className=" bg-gray-300 p-4 shadow-md rounded-lg mt-4 ">
          <h2 className="text-2xl font-bold mb-4">All Homeworks</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Title
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {homeworks.map((homework) => (
                  <tr key={homework._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
                      {homework.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
                      {homework.approvedByAdmin ? (
                        <span className="text-green-500 font-bold">
                          Approved
                        </span>
                      ) : (
                        <span className="text-red-500 font-bold">
                          Not Approved
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>Homework Not Availables</div>
      )}
    </div>
  );
};

export default HomeworksComponent;
