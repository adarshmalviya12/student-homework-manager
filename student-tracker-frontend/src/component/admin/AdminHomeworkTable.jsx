import React from "react";

const AdminHomeworkTable = ({ homeworks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Approved</th>
          </tr>
        </thead>
        <tbody>
          {homeworks.map((homework) => (
            <tr key={homework._id}>
              <td className="py-2 px-4 border-b">{homework.title}</td>
              <td className="py-2 px-4 border-b">
                {homework.approvedByAdmin ? (
                  <span className="text-green-500">Approved</span>
                ) : (
                  <span className="text-red-500">Not Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHomeworkTable;
