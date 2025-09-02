import React, { useEffect, useState } from "react";
import axios from "axios";

const MarketingList = () => {
  const [marketingData, setMarketingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_marketing_info/get_marketing_info.php")
      // .get("http://localhost/gr8-onboardingform/submit_marketing_info/get_marketing_info.php")
      // .get("https://gr8nepal.com/gr8-onboardingform/submit_marketing_info/get_marketing_info.php")
      .then((res) => {
        setMarketingData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading marketing data...</p>;
  if (!Array.isArray(marketingData)) return <p>No data found or invalid response.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Budget</th>
            <th className="border px-3 py-2">KPIs</th>
            <th className="border px-3 py-2">Other KPI</th>
            <th className="border px-3 py-2">Expected Results</th>
          </tr>
        </thead>
        <tbody>
          {marketingData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{item.budget}</td>
              <td className="border px-3 py-2">
                {(Array.isArray(item.selected_kpis) ? item.selected_kpis : []).join(", ")}
              </td>
              <td className="border px-3 py-2">{item.other_kpi}</td>
              <td className="border px-3 py-2">{item.expected_results}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingList;
