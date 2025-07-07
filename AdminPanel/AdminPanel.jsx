// src/components/AdminPanel.jsx
import React, { useState } from "react";
import { FaFolder, FaWpforms } from "react-icons/fa";
import SocialMediaDataList from "./cms/Social/SocialMediaDataList";
import BusinessDataList from "./cms/business/BusinessDataList";
import GoalDataList from "./cms/goal/GoalDataList";
import TargetDataList from "./cms/target/TargetDataList";
import BrandVoiceList from "./cms/brand-voice/BrandVoiceList";
import ContentDataList from "./cms/content/ContentDataList";
import WorkflowList from "./cms/workflow/WorkflowList";
import MarketingList from "./cms/marketing/MarketingList";
import AdditionalInfoList from "./cms/additional/AdditionalInfoList";

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
            <li
              onClick={() => setActiveSection("cms/business")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/business"
                  ? "bg-blue-200 font-semibold"
                  : ""
              }`}
            >
              <FaWpforms /> Business Form
            </li>
            <li
              onClick={() => setActiveSection("cms/social")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/social"
                  ? "bg-blue-200 font-semibold"
                  : ""
              }`}
            >
              <FaWpforms /> Social Media Form
            </li>
            <li
              onClick={() => setActiveSection("cms/goals")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/goals" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <FaWpforms /> Goals Form
            </li>
            <li
              onClick={() => setActiveSection("cms/target")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/target" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <FaWpforms /> Target Form
            </li>
            <li
              onClick={() => setActiveSection("cms/brandvoice")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/brandvoice" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <FaWpforms /> Brand Voice Form
            </li>
            <li
              onClick={() => setActiveSection("cms/content")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/content" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <FaWpforms /> Content Form
            </li>
            <li
              onClick={() => setActiveSection("cms/workflow")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/workflow" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <FaWpforms /> Workflow Form
            </li>
            <li
              onClick={() => setActiveSection("cms/marketing")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/marketing" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <FaWpforms /> Marketing Form
            </li>
            <li
              onClick={() => setActiveSection("cms/additional")}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-100 ${
                activeSection === "cms/additional" ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              <FaWpforms /> Additional Information Form
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {activeSection === "dashboard" && (
          <h1 className="text-2xl font-bold">Dashboard</h1>
        )}

        {activeSection === "cms/business" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Business Data</h1>
            <BusinessDataList />
          </>
        )}
        {activeSection === "cms/social" && (
          <>
            <h1 className="text-2xl font-bold mb-4">
              Submitted Social Media Data
            </h1>
            <SocialMediaDataList />
          </>
        )}
        {activeSection === "cms/goals" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Goals Data</h1>
            <GoalDataList />
          </>
        )}
        {activeSection === "cms/target" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Target data Data</h1>
            <TargetDataList />
          </>
        )}
        {activeSection === "cms/brandvoice" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Brand data Data</h1>
            <BrandVoiceList />
          </>
        )}
        {activeSection === "cms/content" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Content Data</h1>
            <ContentDataList />
          </>
        )}
        {activeSection === "cms/workflow" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Workflow Data</h1>
            <WorkflowList />
          </>
        )}
        {activeSection === "cms/marketing" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Marketing Data</h1>
            <MarketingList />
          </>
        )}
        {activeSection === "cms/additional" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Submitted Additional Information Data</h1>
            <AdditionalInfoList />
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
