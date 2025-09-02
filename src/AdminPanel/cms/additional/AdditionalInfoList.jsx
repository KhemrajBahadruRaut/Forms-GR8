import React, { useEffect, useState } from "react";
import axios from "axios";

const AdditionalInfoList = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      // .get("http://localhost/gr8-onboardingform/submit_additional_info/get_additional_info.php")
      .get("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/submit_additional_info/get_additional_info.php")
      // .get("https://gr8nepal.com/gr8-onboardingform/submit_additional_info/get_additional_info.php")
      .then((res) => {
        setEntries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading additional info...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Admire Accounts</th>
            <th className="border px-3 py-2">Competitors</th>
            <th className="border px-3 py-2">Upcoming Launches</th>
            <th className="border px-3 py-2">Other Info</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(entries) &&
            entries.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{item.admire_accounts}</td>
                <td className="border px-3 py-2">{item.competitors}</td>
                <td className="border px-3 py-2">{item.upcoming_launches}</td>
                <td className="border px-3 py-2">{item.other_info}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdditionalInfoList;
