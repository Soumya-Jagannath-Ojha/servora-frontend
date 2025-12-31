import React from "react";

const projects = [
  {
    id: 1,
    name: "Payroll System",
    status: "In Progress",
    progress: 65,
    manager: "John Doe",
  },
  {
    id: 2,
    name: "HR Management",
    status: "Completed",
    progress: 100,
    manager: "Jane Smith",
  },
  {
    id: 3,
    name: "Inventory Module",
    status: "Pending",
    progress: 30,
    manager: "Alex Brown",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Project Management Dashboard
        </h1>
        <p className="text-gray-500">
          Monitor project progress and performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Projects</h3>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600">7</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">In Progress</h3>
          <p className="text-2xl font-bold text-blue-600">4</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-500">1</p>
        </div>
      </div>

      {/* Project Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Project Overview
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-3">Project Name</th>
                <th>Status</th>
                <th>Manager</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b last:border-none"
                >
                  <td className="py-3 font-medium text-gray-800">
                    {project.name}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="text-gray-600">
                    {project.manager}
                  </td>

                  <td className="w-48">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full
                          ${
                            project.progress === 100
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {project.progress}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
