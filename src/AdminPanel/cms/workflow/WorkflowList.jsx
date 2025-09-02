import React, { useEffect, useState } from "react";

const WorkflowList = () => {
  const [workflowList, setWorkflowList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_workflow_info/get_workflow_info.php")
    // fetch("http://localhost/gr8-onboardingform/submit_workflow_info/get_workflow_info.php")
    // fetch("https://gr8nepal.com/gr8-onboardingform/submit_workflow_info/get_workflow_info.php")
      .then((res) => res.json())
      .then((data) => {
        setWorkflowList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading workflow data...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Reviewer Name</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Contact Modes</th>
            <th className="border px-3 py-2">Other Contact</th>
            <th className="border px-3 py-2">Report Frequency</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(workflowList) &&
            workflowList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{item.reviewer_name}</td>
                <td className="border px-3 py-2">{item.reviewer_location}</td>
                <td className="border px-3 py-2">{item.reviewer_phone}</td>
                <td className="border px-3 py-2">
                  {(item.preferred_contact_modes || []).join(", ")}
                </td>
                <td className="border px-3 py-2">{item.other_contact_method}</td>
                <td className="border px-3 py-2">{item.report_frequency}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowList;
