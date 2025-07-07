import React, { useEffect, useState } from "react";
import axios from "axios";

const TargetDataList = () => {
  const [targetList, setTargetList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/gr8-onboardingform/submit_target_info/get_target_info.php")
      .then((res) => {
        setTargetList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading target audience data...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Ages</th>
            <th className="border px-3 py-2">Genders</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Interests</th>
            <th className="border px-3 py-2">Profession</th>
            <th className="border px-3 py-2">Other</th>
            <th className="border px-3 py-2">Industries</th>
            <th className="border px-3 py-2">Pain Points</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(targetList) && targetList.length > 0 ? (
            targetList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-3 py-2">
                  {safeJson(item.selected_ages)}
                </td>
                <td className="border px-3 py-2">
                  {safeJson(item.selected_genders)}
                </td>
                <td className="border px-3 py-2">{item.target_location}</td>
                <td className="border px-3 py-2">{item.target_interests}</td>
                <td className="border px-3 py-2">{item.target_profession}</td>
                <td className="border px-3 py-2">{item.target_other_details}</td>
                <td className="border px-3 py-2">{item.target_industries}</td>
                <td className="border px-3 py-2">{item.target_pain_points}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                No target data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Helper to safely parse JSON
function safeJson(jsonStr) {
  try {
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed.join(", ") : "";
  } catch {
    return "";
  }
}

export default TargetDataList;
