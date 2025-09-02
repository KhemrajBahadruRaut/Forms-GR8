import React, { useEffect, useState } from "react";
import axios from "axios";

const GoalDataList = () => {
  const [goalsList, setGoalsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_goals_info/get_goals_info.php")
    // axios.get("http://localhost/gr8-onboardingform/submit_goals_info/get_goals_info.php")
    // axios.get("https://gr8nepal.com/gr8-onboardingform/submit_goals_info/get_goals_info.php")
      .then((res) => {
        setGoalsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading submitted goals...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Selected Goals</th>
            <th className="border px-3 py-2">Other Goal Details</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(goalsList) && goalsList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-3 py-2">
                {JSON.parse(item.selected_goals).join(", ")}
              </td>
              <td className="border px-3 py-2">{item.other_goal_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalDataList;
