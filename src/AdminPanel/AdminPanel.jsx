  // src/components/AdminPanel.jsx
  import React, { useState } from "react";
  import { FaFolder, FaWpforms } from "react-icons/fa";

  import Mainsection from "./Mainsection";
  import AdminBusinessList from "./AdminBusinessList";

  const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState("dashboard");

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

          {/* CMS Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <FaFolder /> <span>CMS</span>
            </div>
            <ul className="ml-4 space-y-2">
              {/* main admin section */}
              <li
                onClick={() => setActiveSection("cms/Data")}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                  activeSection === "cms/Data" ? "bg-blue-200 font-semibold" : ""
                }`}
              >
                <FaWpforms /> Data
              </li>
              <li
                onClick={() => setActiveSection("cms/Lists")}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                  activeSection === "cms/Lists" ? "bg-blue-200 font-semibold" : ""
                }`}
              >
                <FaWpforms /> Lists
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          {activeSection === "dashboard" && (
            <h1 className="text-2xl font-bold">Dashboard</h1>
          )}

          {activeSection === "cms/Data" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Submitted Data</h1>
              <Mainsection />
            </>
          )}
          {activeSection === "cms/Lists" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Name Lists</h1>
              <AdminBusinessList />
            </>
          )}
        
        </main>
      </div>
    );
  };

  export default AdminPanel;
